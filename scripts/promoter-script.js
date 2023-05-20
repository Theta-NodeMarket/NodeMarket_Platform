const BASE_URL = "<<CHANGE BASE URL>>";
const PROMOTER_ID = "<<CHANGE PROMOTER ID>>";
const GET_ADS_URL = "/api/content/get-client-ads";
const AD_CLICK_URL = "/api/content/click-ad";
const THETA_AD_SELECTOR = ".theta-ad";
const IMAGE_PARAMS =
  "style='max-height: 300px; max-width: auto; display: block; margin: 30px auto; cursor: pointer;'";
const VIDEO_PARAMS =
  "playsinline autoplay muted defaultMuted loop style='max-height: 300px; max-width: auto; display: block; margin: 30px auto; cursor: pointer;'";

/**
 * @param {string} selector CSS Selector to search for elements
 * @param {Function} callback Runs each time a matching element is found
 * @param {Object} [config={attributes: true, childList: true, subtree: true}] Configuration object to be passed into observer
 */
function listenForNewElementAdded(
  selector,
  callback,
  config = { attributes: true, childList: true, subtree: true }
) {
  const observerCallback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
      for (const node of mutation.addedNodes) {
        if (!node || !node.matches(selector)) break;
        callback(node);
      }
    }
  };
  const observer = new MutationObserver(observerCallback);
  observer.observe(document, config);
  return observer.disconnect;
}

async function requestAds(n = 1) {
  const url = `${BASE_URL}${GET_ADS_URL}?siteId=${PROMOTER_ID}&n=${n}`;
  const ads = await (await fetch(url)).json();
  return ads;
}

async function handleClickAd(ad) {
  const { id: adId, redirect_link } = ad;
  const url = `${BASE_URL}${AD_CLICK_URL}?siteId=${PROMOTER_ID}&adId=${adId}`;
  fetch(url, { method: "POST" });
  window.location.href = redirect_link;
}

function injectAdIntoSlot(ad, slotElement) {
  const { ad_name, media_type, src } = ad;
  const params =
    media_type === "image"
      ? IMAGE_PARAMS
      : VIDEO_PARAMS;

  const thetaAdHTML = media_type === "image" ? `<${media_type} src=${src} ${params} alt=${ad_name} />` : `<${media_type} ${params} alt=${ad_name}><source src=${src}></source></${media_type}`;

  slotElement.innerHTML = thetaAdHTML;

  slotElement.firstElementChild.addEventListener("click", (_event) =>
    handleClickAd(ad)
  );
}

async function initNodeMarket() {
  const adSlots = document.querySelectorAll(THETA_AD_SELECTOR);
  const adCount = adSlots.length;

  const ads = await requestAds(adCount);

  for (let i = 0; i < adCount; i++) {
    injectAdIntoSlot(ads[i], adSlots[i]);
  }

  listenForNewElementAdded(THETA_AD_SELECTOR, async (slot) => {
    const [ad] = await requestAds();
    injectAdIntoSlot(ad, slot);
  });
}

initNodeMarket();
