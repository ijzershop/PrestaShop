document.addEventListener("DOMContentLoaded", function() {
  const cookiesAcceptButton1 = document.getElementById('cookie-accept');
  const cookiesChangeButton = document.getElementById('cookie-change');
  const cookieAcceptChangeButton = document.getElementById('cookie-accept-change');

  const toggleModalState = ()=> {
    const cookieState1 = document.querySelector('div[data-id="cookie-primary"]');
    const cookieState2 = document.querySelector('div[data-id="cookie-secondary"]');

    if(cookieState1.classList.contains('d-none')){
      cookieState1.classList.replace('d-none', 'd-block');
      cookieState2.classList.replace( 'd-block', 'd-none');
    } else {
      cookieState1.classList.replace( 'd-block', 'd-none');
      cookieState2.classList.replace('d-none', 'd-block');
    }

  }

  const setConsentCookie = ({ functional, analytics, marketing }) => {

    let date = new Date();
    const value = JSON.stringify({ functional: functional, analytics: analytics, marketing: marketing });
    const expirationDays = 365;
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expire = date.toUTCString();
    const domain = window.location.host;

    document.cookie = `cookie-consent=${value};expires=${expire}domain=${domain};path=/;secure;samesite=lax;`

    if (marketing === true) {
      dataLayer.push({event: "marketing_consent"});
    }

    if(document.getElementById('cookiesModal') !== null){
      document.getElementById('cookiesModal').remove();
    }
  }

  const verifyConsent = ()=> {
    const marketingCheckbox = document.querySelector("input.cookie-input[name='marketing']");
    setConsentCookie({functional: true, analytics: true, marketing: marketingCheckbox.checked});
  }

  const subscribeToCookieBanner = ()=> {
    cookiesChangeButton.addEventListener('click', toggleModalState);
    cookiesAcceptButton1.addEventListener( 'click', ()=> { setConsentCookie({functional: true, analytics: true, marketing: true}) } );
    cookieAcceptChangeButton.addEventListener('click', verifyConsent);
  }

  subscribeToCookieBanner();
});
