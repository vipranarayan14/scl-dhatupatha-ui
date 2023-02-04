import { createURL, qs } from "./utils";

const createDhatuModalTitle = (details) =>
  `${details.muladhatu} (${details.dhatu}) ${details.meaning}`;

const createDhatuModalContent = (details, formsURL, graphURL) => {
  const { madhaviyaId, kshirataranginiId, dhatupradipaId, ...slotData } =
    details;

  const template = qs("#dhatu-all-details");

  const dhatuModalContent = template.content.cloneNode(true);

  const getSlot = (slotName) =>
    qs(`[data-slot="${slotName}"]`, dhatuModalContent);

  for (const [slotName, slotValue] of Object.entries(slotData)) {
    const slot = getSlot(slotName);

    if (slot) slot.textContent = slotValue;
  }

  const vrittiDetails = { madhaviyaId, kshirataranginiId, dhatupradipaId };

  for (const [slotName, vrittiNum] of Object.entries(vrittiDetails)) {
    const vrittiSlot = getSlot(slotName);

    if (vrittiNum !== "-") {
      vrittiSlot.textContent = vrittiNum;
      continue;
    }

    vrittiSlot.classList.replace("text-bg-secondary", "text-bg-danger");
    vrittiSlot.textContent = "·";
  }

  const formsSlot = getSlot("forms");
  const formsLinkSlot = getSlot("formsLink");

  if (!formsURL) {
    formsSlot.innerHTML = "N/A";
  } else {
    formsLinkSlot.href = formsURL;
  }

  const graphSlot = getSlot("graph");
  const graphLinkSlot = getSlot("graphLink");
  const graphImgSlot = getSlot("graphImg");

  if (!graphURL) {
    graphSlot.innerHTML = "N/A";
  } else {
    graphLinkSlot.href = graphURL;
    graphImgSlot.src = graphURL;
  }

  return dhatuModalContent;
};

export const createDhatuModalData = (details, Globals) => {
  const formsURL = createURL(Globals.ENDPOINTS.FORMS, details.formsURL);
  const graphURL = createURL(Globals.ENDPOINTS.GRAPH, details.graphURL);

  return {
    title: createDhatuModalTitle(details),
    content: createDhatuModalContent(details, formsURL, graphURL),
  };
};
