import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent {
  
  stripeRole: string;
  isloading: boolean;
  products = [];
  invoices = [];
  functionLocation = 'us-central1';

  public userId:any = this.afAuth.auth.currentUser.uid;
  
  constructor(
    private afStore: AngularFirestore,
    private afFunctions: AngularFireFunctions,
    private afAuth: AngularFireAuth,
  ) {
    this.displayProducts();
    this.displayInvoices();
    this.setCurrentUser();
    this.getCustomClaimRole();
  }
  
  // ✅ DISPLAY PRODUCTS
  displayProducts() {
    const ref = this.afStore.collection('products').ref;
    ref.where('active', '==', true)
      .get()
      .then(querySnapshot => {
        const items = [];
        querySnapshot.forEach(async function (doc) {

          const priceSnap = await doc.ref
            .collection('prices')
            .where('active', '==', true)
            .orderBy('unit_amount')
            .get();

          const product: any = doc.data();

          priceSnap.docs.forEach((doc) => {
            const priceId = doc.id;
            const priceData = doc.data();

            // console.log('📄 USER PRODUCTS:', priceData);

            if (priceData.active === true) {
              items.push({
                name: product.name,
                image: product.images[0],
                description: product.description,
                billing_scheme: priceData.billing_scheme,
                currency: priceData.currency,
                interval: priceData.interval,
                price: ((priceData.unit_amount / 100).toFixed(0)),
                limit_point: product.metadata.limit_point,
                priceId,
              });
            }
          });
        });
        this.products = items;  
      });
  }
  
  // ✅ DISPLAY INVOICES
  displayInvoices() {
    const userId = this.afAuth.auth.currentUser.uid;
    const ref = this.afStore.collection('customers').ref;
    ref.doc(userId)
      .collection('subscriptions')
      //.where('status', 'in', ['trialing', 'active'])
      .get()
      .then(querySnapshot => {
        const items = [];
        querySnapshot.forEach(async function (doc) {
          const invoiceSnap = await doc.ref
            .collection('invoices')
            .where('status', '==', 'paid')
            //.orderBy('unit_amount')
            .get();

          //const invoice: any = doc.data();

          invoiceSnap.docs.forEach((doc) => {
            const invoiceId = doc.id;
            const invoiceData = doc.data();
            // console.log('📄 USER INVOICES:', invoiceData);

            if (invoiceData.status === 'paid') {
              items.push({
                number: invoiceData.number,
                url: invoiceData.hosted_invoice_url,
                created: invoiceData.created * 1000,
                invoiceId,
              });
            }
          });
        });
        this.invoices = items;
      });
  }

  // ✅ SUBSCRIBE
  public async subscribe(price: string) {
    this.isloading = true // Spinner
    const userId = this.afAuth.auth.currentUser.uid;
    const selectedPrice = [{
      price,
      quantity: 1
    }];

    const id = [];
    for (const prod of this.products) {
      id.push({
        price: prod.priceId,
        quantity: 1
      });
    }

    const checkoutSession = {
      // automatic_tax: true,
      // tax_id_collection: true,
      collect_shipping_address: false,
      // tax_rates: environment.taxRates,
      allow_promotion_codes: true,
      line_items: selectedPrice, // id,
      success_url: window.location.href,
      cancel_url: window.location.href,
      metadata: { key: 'value'},
    };

    this.afStore
      .collection('customers')
      .doc(userId)
      .collection('checkout_sessions')
      .add(checkoutSession).then(docRef => {
        // Wait for the CheckoutSession to get attached by the extension
        docRef.onSnapshot((snap) => {
          const { error, url } = snap.data();
          if (error) {
            alert(`An error occured: ${error.message}`);
          } else if (url) {
            window.location.assign(url);
          }
        });
      });
  }

  // ✅ SET USER DEFAULT DATA
  private setCurrentUser(): void {
    this.userId = {
      uid: '',
      displayName: '',
      priceId: '',
      billing_scheme: '',
      currency: '',
      interval: '',
      price: 0,
      // stripeRole: await getStripeRole(),
    }
    /*
    this.userId((firebaseUser) => {
      if (firebaseUser) {
        //this.userId.uid = firebaseUser.uid;
        //this.userId.displayName = firebaseUser.displayName;
        this.checkUserProduct();
      }
    });
    */  
    this.checkUserProduct();
  }
  
  // ✅ GET USER SUBSCRIPTION
  // only first subscription is shown.
  private checkUserProduct() {
    const userId = this.afAuth.auth.currentUser.uid;
    const ref = this.afStore.collection('customers').ref;
    ref.doc(userId)
      .collection('subscriptions')
      .where('status', 'in', ['trialing', 'active'])
      .onSnapshot(async (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        // In this implementation we only expect one Subscription to exist
        const subscription = snapshot.docs[0].data();
        // console.log('📄 USER SUBSCRIPTION:', subscription);
          this.userId.nextPayment = subscription.current_period_end.seconds * 1000;

        const priceData = (await subscription.price.get()).data();
          this.userId.billing_scheme = priceData.billing_scheme;
          this.userId.active = priceData.active;
          this.userId.currency = priceData.currency;
          this.userId.interval = priceData.interval;
          this.userId.price = ((priceData.unit_amount / 100).toFixed(0));
          this.userId.priceId = subscription.price.id;

        const productData = (await subscription.product.get()).data();
          this.userId.name = productData.name;
          this.userId.description = productData.description;
      });
  }

  // ✅ CUSTOMER PORTAL  
  async accessCustomerPortal() {
    this.isloading = true // Spinner
    const functionRef = this.afFunctions
      .httpsCallable('ext-firestore-stripe-payments-createPortalLink');
    await functionRef({ returnUrl: window.location.href }) // 'href' to return to same page
      .pipe()
      .subscribe(data => {
        window.location.assign(data.url);
      }, err => {
        alert(`An error occured: ${err}`);
      });
  }

  // ✅ STRIPE ROLES
  // IMPORTANT: at Stripe dashboard/product add metadata field: 'firebaseRole' and example value: 'premium'
  async getCustomClaimRole() {
    await this.afAuth.auth.currentUser.getIdToken(true); // await firebase.auth().currentUser.getIdToken(true);
    const decodedToken = await this.afAuth.auth.currentUser.getIdTokenResult(); // const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
    console.log('👤 USER ROLE:', decodedToken.claims.stripeRole);
    this.stripeRole = decodedToken.claims.stripeRole;
    return decodedToken.claims.stripeRole || 'free';
  }
/*
  async getCustomClaimRole() {

    this.auth.user.subscribe(async res => {
      res.getIdToken(true);
      const decodedToken = await res.getIdTokenResult();
      console.log(decodedToken.claims.stripeRole);
      this.role = decodedToken.claims.stripeRole;
      return decodedToken.claims.stripeRole;
    });
  }
  */
}