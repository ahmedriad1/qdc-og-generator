import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { Field, Label } from "@/components/Field";
import { LayoutOptions } from "@/components/LayoutOptions";
import { Link } from "@/components/Link";
import { Select } from "@/components/Select";
import { useConfig } from "@/hooks/useConfig";
import { useCopy } from "@/hooks/useCopy";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useLayoutConfig } from "@/hooks/useLayoutConfig";
import { layouts } from "@/layouts";
import { FileType } from "@/types";
import clsx from "clsx";

const Home: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <main className="w-full min-h-screen bg-gray-200 py-14 font-montserrat">
      <div className="max-w-6xl h-full mx-auto px-4 py-2">
        <header>
          <h1 className="text-5xl font-bold">Quran.com OG Image Generator</h1>
        </header>

        {/* We pull the state from local storage so need the app to be loaded in the browser */}
        {isMounted && (
          <section className="mt-24 flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
            <Config />
            <Viewer />
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;

export const Config: React.FC = () => {
  const [config, setConfig] = useConfig();
  const [layoutConfig] = useLayoutConfig();
  const [isCopied, copy] = useCopy();

  const layout = useMemo(
    () => layouts.find(l => l.name === config.layout),
    [config.layout],
  );

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const imageURL = useMemo(() => `/api/image?${query}`, [query]);
  const htmlURL = useMemo(() => `/api/html?${query}`, [query]);

  return (
    <div className="block w-[500px] max-w-full space-y-7">
      <div className="space-y-7">
        <Field>
          <Label>Format</Label>
          <Select
            value={config.format}
            options={[{ value: "png" }, { value: "jpeg" }]}
            onChange={fileType =>
              setConfig(c => ({ ...c, format: fileType as FileType }))
            }
          />
        </Field>

        <Field>
          <Label>Layout</Label>
          <Select
            value={config.layout}
            options={layouts.map(l => ({ value: l.name }))}
            onChange={layoutName =>
              setConfig(c => ({ ...c, layout: layoutName }))
            }
          />
        </Field>
      </div>

      <div className="flex space-x-6 justify-end mt-6">
        <Link
          href={htmlURL}
          external
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Open HTML Page
        </Link>
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => copy(`${window.location.origin}${imageURL}`)}
        >
          {isCopied ? "Copied!" : "Copy Image URL"}
        </button>
      </div>

      <div>
        {layout == null ? (
          <p>Layout {config.layout} does not exist</p>
        ) : (
          <LayoutOptions layout={layout} key={layout.name} />
        )}
      </div>
    </div>
  );
};

export const Viewer: React.FC = () => {
  const [config] = useConfig();
  const [layoutConfig] = useLayoutConfig();

  const [isLoaded, setIsLoaded] = useState(true);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const imageURL = useMemo(() => `/api/image?${query}`, [query]);

  const debouncedImageURL = useDebouncedValue(imageURL, 200);
  useEffect(() => setIsLoaded(false), [debouncedImageURL]);

  return (
    <div className="w-full">
      <div className="w-full relative aspect-video">
        <img
          className={clsx(!isLoaded && "blur-sm")}
          src={debouncedImageURL}
          alt={`OG Image for the ${config.layout} layout`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};
