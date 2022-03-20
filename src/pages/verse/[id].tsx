import { SEO } from "@/components/SEO";
import { isDev } from "@/utils/functions";
import { GetServerSideProps } from "next";

const QuranPage = ({ id, baseUrl }) => {
  return (
    <>
      <SEO
        image={encodeURI(
          `${baseUrl}/image?format=png&layout=Quran&Verse Key=${id}`,
        )}
      />
      <p>
        Image Url:
        <br />
        {`${baseUrl}/image?format=png&layout=Quran&Verse Key=${id}`}
      </p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params || {};
  if (!id)
    return {
      notFound: true,
    };
  const baseUrl = `${isDev() ? "http" : "https"}://${req.headers.host}`;

  return {
    props: {
      id,
      baseUrl,
    },
  };
};

export default QuranPage;
