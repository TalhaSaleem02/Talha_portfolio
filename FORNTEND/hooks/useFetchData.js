import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(apiEndpoint) {
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                console.log(`Fetching data from ${apiEndpoint}`);
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false);
                
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        };

        // fetch blog data only if apiEndpoint exists
        if (apiEndpoint) {
            fetchAllData();
        }
    }, [apiEndpoint]);

    return { alldata, loading };
}

export default useFetchData;