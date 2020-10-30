export enum IPReportServices {
  Freegeoip = 'freegeoip',
  Ipapi = 'ipapi',
}

export type IPReport = {
  reportService: IPReportServices;
  data: {
    ip: string;
    countryCode: string;
    countryName: string;
    regionCode: string;
  };
};

export enum IPReportServiceURL {
  Freegeoip = 'https://freegeoip.app/json/{ip}',
  Ipapi = 'https://ipapi.co/{ip}/json/',
}
