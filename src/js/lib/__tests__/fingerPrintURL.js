import { queryfy } from 'docomo-utils';

export default function fingerPrintURLForTest(Config, pony, returnUrl) {
  let { MFP_API_URL } = Config;
  MFP_API_URL = `${MFP_API_URL}put`;
  const mfpParams = {
    apikey: Config.MOTIME_API_KEY ? Config.MOTIME_API_KEY : Config.MOA_API_KEY,
    contents_inapp: {
      api_country: Config.MFP_CONTENT_INAPP_API_COUNTRY ? Config.MFP_CONTENT_INAPP_API_COUNTRY : Config.API_COUNTRY,
      country: Config.MFP_CONTENT_INAPP_TLD ? Config.MFP_CONTENT_INAPP_TLD : Config.TLD,
      fpnamespace: Config.MFP_NAMESPACE ? Config.MFP_NAMESPACE : Config.SITE_PROFILE,
      extData: {
        domain: Config.DEST_DOMAIN,
        return_url: encodeURIComponent(returnUrl),
        ponyUrl: pony,
      },
  },
    country: Config.MFP_TLD ? Config.MFP_TLD : Config.TLD,
    expire: Config.MFP_EXPIRE || 300,
  };

  mfpParams.contents_inapp.extData.ponyUrl = pony;
  mfpParams.contents_inapp = JSON.stringify(mfpParams.contents_inapp);
  return MFP_API_URL + decodeURIComponent(queryfy('', mfpParams));
}
