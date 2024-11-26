export default async function getSingleProducts(id) {
    console.log('mysqldb called');
    try {
        // Corrected template literal for string interpolation
        const response = await fetch(`http://localhost:3005/singleproducts/${id}`);
        console.log(id);
        
        if (response.ok) {
            // Await the response JSON parsing
            const data = await response.json();
            return data;
        } else {
            console.error('Error fetching data:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
