const BASE_URL = "http://localhost:3000";
const GET_ADS_URL = "/api/advertisements/get-client-ads";
const AD_CLICK_URL = "/api/advertisements/click-ad";
const PROMOTER_ID = "<<CHANGE THIS ID>>";
const THETA_CLASS = "theta-ad";
const IMAGE_PARAMS =
  "style='max-height: 300px; max-width: auto; display: block; margin: 30px auto; cursor: pointer;'";
const VIDEO_PARAMS =
  "playInline autoplay muted loop style='max-height: 300px; max-width: auto; display: block; margin: 30px auto; cursor: pointer;'";

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
      : media_type === "video"
      ? VIDEO_PARAMS
      : undefined;

  const thetaAdHTML = `<${media_type} src=${src} ${params} alt=${ad_name} />`;

  slotElement.innerHTML = thetaAdHTML;

  slotElement.firstElementChild.addEventListener("click", (_event) =>
    handleClickAd(ad)
  );
}

async function initNodeMarket() {
  const adSlots = document.querySelectorAll(".theta-ad");
  const adCount = adSlots.length;

  const ads = await requestAds(adCount);

  for (let i = 0; i < adCount; i++) {
    injectAdIntoSlot(ads[i], adSlots[i]);
  }

  listenForNewElementAdded(`.${THETA_CLASS}`, async (slot) => {
    const [ad] = await requestAds();
    injectAdIntoSlot(ad, slot);
  });
}

initNodeMarket();
