// Fetch movie list and populate dropdown
fetch(`${API_URL}/get_movie_list`)
    .then(response => response.json())
    .then(data => {
       
        const movieSuggestions = document.getElementById('movieSuggestions');
        data.forEach(movie => {
            
            const option = document.createElement('option');
            option.value = movie;
            option.textContent = movie;
            movieSuggestions.appendChild(option);

        });
    });

// Handle recommendation button click
document.getElementById('recommendButton').addEventListener('click', () => {
    const selectedMovie = document.getElementById('movieInput').value;

    document.getElementById('message').innerHTML = `L  <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg> ading ...`;
    document.getElementById('recommendation').innerHTML = ''; 

    fetch(`${API_URL}/get_recommendation?movie=${selectedMovie}`)
        .then(response => response.json())
        .then(data => {
            const recommendationDiv = document.getElementById('recommendation');
            

            data.recommended_movie_names.forEach((name, index) => {
                const movieDiv = document.createElement('div');

                movieDiv.innerHTML = `<div class="group relative">
            <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="${data.recommended_movie_posters[index]}"
                    alt="Front of men&#039;s Basic Tee in black."
                    class="h-full w-full object-cover object-center lg:h-full lg:w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <div>
                    <h3 class="text-sm text-gray-700">
                        <a href="#">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${name}
                        </a>
                    </h3>
                    
                </div>
                
            </div>
        </div>`

                document.getElementById('message').innerHTML = `Here are Your Top 5 🎬 Movie Gems, Handpicked Just for You!`;
                recommendationDiv.appendChild(movieDiv);
            });
        })
        .catch(error => {
            document.getElementById('message').innerHTML = `Oops! Your Movie Not In Our Database ☹️, will soon add it, Try Searching Something Else !`;
            console.error('Error fetching recommendations:', error);
        });
});




const textToType = "Movie"; 
const typedTextElement = document.getElementById('typed-text');

let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        typedTextElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 400);
    } else {
        index = 0;
        typedTextElement.textContent = '';
        setTimeout(typeWriter, 1000);
    }
}


typeWriter();

