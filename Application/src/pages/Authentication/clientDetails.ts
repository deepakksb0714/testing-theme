import { useState, useEffect } from 'react';

interface ConfigParams {
  clientId: string;
  issuer: string;
  // Add other properties as needed
}

const useClientDetails = () => {
  const [userPoolId, setUserPoolId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    const fetchConfigParams = async () => {
      const siteConfig = process.env.REACT_APP_SITE_CONFIG ? JSON.parse(process.env.REACT_APP_SITE_CONFIG) : null;
      try {
        const url = `${siteConfig.apiUrl}/auth-info${siteConfig.usingCustomDomain ? '' : `?tenantId=${getTenantId(siteConfig)}`}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("fetchConfigParams--"+data)
        if (data.clientId) {
          setClientId(data.clientId);
        }
        setUserPoolId(getUserPoolId(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchConfigParams();
  }, []); // Removed dependency array

  const getUserPoolId = (configParams: ConfigParams | null): string | null => {
    if (!configParams || !configParams.issuer) return null;

    const parts = configParams.issuer.split('/');
    return parts[parts.length - 1];
  };

  const getTenantId = (siteConfig: any): string | null => {
    if (!siteConfig) return null;

    if (siteConfig.usingCustomDomain) {
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      return parts[0];
    } else {
      const parts = window.location.hash.split('/');
      return parts[1];
    }
  };

  return { userPoolId, clientId, loading };
};

export default useClientDetails;
