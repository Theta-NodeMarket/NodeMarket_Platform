// We can refactor below.
// This just demonstrates that it is possible. In the future we can iterate through different ads instead of only using the first ad object.
async function GetAdvertisements() {
  const thetaAds = document.getElementsByClassName("theta-ad");
  const numberOfthetaAds = thetaAds.length;

  let ResponseArray = [];
  const response = await fetch(
    `http://localhost:3000/advertisements/get-ad-data?id=<<CHANGE THIS ID>>&n=${numberOfthetaAds}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }
  );

  const AdvertisementList = await response.json();
  const AdvertisementListLength = Object.keys(AdvertisementList).length;

  for (let i = 0; i < AdvertisementListLength; i++) {
    ResponseArray.push({
      adId: AdvertisementList[i].adId,
      token: AdvertisementList[i].token,
      mediaType: AdvertisementList[i].mediaType,
      redirectLink: AdvertisementList[i].redirectLink,
      src: AdvertisementList[i].src,
      mediaTypeParams: AdvertisementList[i].mediaTypeParams,
    });
  }

  // Add the advertisement after every element with the theta-ad class. This lets the user customize their ad display experience.
  const body = document.getElementsByClassName("theta-ad");
  for (let i = 0; i < body.length; i++) {
    // Put random ad, could be better but it works for now.
    body[i].insertAdjacentHTML(
      "beforeend",
      `<${ResponseArray[i].mediaType} src=${ResponseArray[i].src} ${ResponseArray[i].mediaTypeParams} class=${ResponseArray[i].token} />`
    );

    // Look for the ad that was just added. Add redirect on click event listener
    let ads = document.getElementsByClassName(ResponseArray[i].token);
    ads[0].addEventListener("click", () => {
      upsertClicks(ResponseArray[i].adId);
      window.location.href = ResponseArray[i].redirectLink;
    });
  }
}

async function upsertClicks(adId) {
  const { response, error } = await fetch(
    `http://localhost:3000/advertisements/upsert-clicks?id=<<CHANGE THIS ID>>&adId=${adId}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    }
  );

  if (error) console.log(error);
}

GetAdvertisements();
