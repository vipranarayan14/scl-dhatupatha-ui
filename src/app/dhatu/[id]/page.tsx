import { Metadata } from "next";

import { getDhatupathaLocal } from "@/utils/getDhatupathaLocal";
import { PageHeader } from "./PageHeader";
import { DhatuDetailsTable } from "./DetailsTable";
import { VrittiAccordionsGroup } from "./VrittiAccordionsGroup";
import { FormsAccordionsGroup } from "./FormsAccordionsGroup";
import { SectionHeading } from "./SectionHeading";
import { Graph } from "./Graph";

const dhatupatha = await getDhatupathaLocal();

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { id } = params;

  const dhatuDetails = dhatupatha.find(
    (dhatuDetails) => dhatuDetails.id === Number(id)
  );

  if (!dhatuDetails) {
    return {
      title: "Page not found",
    };
  }

  const { muladhatu, dhatu, meaning } = dhatuDetails;

  return {
    title: `${muladhatu} (${dhatu}) ${meaning}`,
  };
}

export async function generateStaticParams() {
  const staticParams = dhatupatha.map(({ id }) => ({
    id: id.toString(),
  }));

  return staticParams;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const dhatuDetails = dhatupatha.find(
    (dhatuDetails) => dhatuDetails.id === Number(id)
  );

  if (!dhatuDetails) {
    return <p>Page not found.</p>;
  }

  return (
    <div>
      <PageHeader dhatuDetails={dhatuDetails} />

      <DhatuDetailsTable dhatuDetails={dhatuDetails} />

      <section>
        <SectionHeading>वृत्तयः</SectionHeading>
        <div>
          <VrittiAccordionsGroup dhatuDetails={dhatuDetails} />
        </div>
      </section>

      <section>
        <SectionHeading>तिङन्त-रूपाणि</SectionHeading>
        <div>
          <FormsAccordionsGroup dhatuDetails={dhatuDetails} />
        </div>
      </section>

      {dhatuDetails.graphURL && (
        <section>
          <SectionHeading>कृदन्त-रूपाणि</SectionHeading>

          <Graph graphURL={dhatuDetails.graphURL} />
        </section>
      )}
    </div>
  );
}
