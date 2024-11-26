export default async function getAllProducts(){
    console.log('mysqldb called');
    try {
        const response = await fetch('http://localhost:3005/products');
        
        if (response.ok) {
            // Parse the JSON response
            const data = response.json();
            return data;
            //console.log(data);
            // Log the data to the console
            //return data;
            
            // Do something with the data, such as displaying it on the webpage
        } else {
            // If the response is not successful, log an error message
            console.error('Error fetching data:', response.statusText);
        }
    } catch (error) {
        // If an error occurs during the fetch operation, log it to the console
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function to initiate the fetch operation
getAllProducts()