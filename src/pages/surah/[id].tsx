import { SEO } from "@/components/SEO";
import { isDev } from "@/utils/functions";
import { GetServerSideProps } from "next";

const SurahPage = ({ id, baseUrl }) => {
  return (
    <>
      <SEO
        image={encodeURI(
          `${baseUrl}/image?format=png&layout=Surah&Surah=${id}`,
        )}
      />
      <p>
        Image Url:
        <br />
        {`${baseUrl}/image?format=png&layout=Surah&Surah=${id}`}
      </p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { id } = params || {};
  if (!id || !Number(id) || Number(id) <= 0 || Number(id) > 114)
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

export default SurahPage;
