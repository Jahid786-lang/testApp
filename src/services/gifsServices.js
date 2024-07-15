
import baseAxios from "./baseAxios";
const fetchTrendingGifs = async (page = 1) => {
    const response = await baseAxios.get(
        `/trending?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=24&offset=${(page - 1) * 24}&rating=g`
    );
    return response.data ;
};

export {fetchTrendingGifs};
