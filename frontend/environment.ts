interface webEnvType {
  API_URL: string;
}

const WEB_ENV: webEnvType = {
  API_URL: process.env.NEXT_PUBLIC_API_URL!,
};

const getEnvVars = () => {
  // do this in case wanna to add in React native web in same repo
  return WEB_ENV;
};

export default getEnvVars;
