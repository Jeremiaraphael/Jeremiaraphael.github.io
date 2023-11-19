const url = "https://api-berita-indonesia.vercel.app/antara/politik/";
async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const headerHtml = `
                <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
                    <a class="navbar-brand" href="${data.data.link}">
                        <img src="${data.data.image}" alt="${data.data.title}" height="30" class="d-inline-block align-top">
                    </a>
                    <h1 class="mb-0 text-danger">${data.data.title}</h1>
                    <span class="navbar-text">
                        ${data.data.description}
                    </span>
                </nav>
            `;

      document.getElementById("news-header").innerHTML = headerHtml;

      const postContainer = document.getElementById("news-container");
      data.data.posts.forEach((post) => {
        let truncatedDescription =
          post.description.length > 100
            ? post.description.substring(0, 100) + "..."
            : post.description;

        const postCardHtml = `
                            <div class="col-md-4 mb-5">
                                <div class="card">
                                    <img src="${post.thumbnail}" class="card" alt="...">
                                    <div class="card-body shadow d-flex flex-column">
                                        <h5 class="card-title">${post.title}</h5>
                                        <p class="card-text flex text-justify">${truncatedDescription}</p>
                                        <a href="${post.link}" class="btn btn-danger mt-auto">Lihat Selengkapnya</a>
                                    </div>
                                </div>
                            </div>
                        `;

        postContainer.innerHTML += postCardHtml;
      });
    }
  } catch (error) {
    console.log(error);
  }
}
