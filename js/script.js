/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    document
        .getElementById("navLinks")
        .classList.toggle("active");

}



/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}



/* =====================================================
   WHATSAPP ORDER
===================================================== */

function orderProduct(productName, packageName, price) {

    const phoneNumber = "6287893223780";

    const message =
        `Halo Kak, saya ingin memesan:%0A%0A` +
        `📦 Produk: ${productName}%0A` +
        `📋 Paket: ${packageName}%0A` +
        `💰 Harga: ${price}%0A%0A` +
        `Mohon diproses ya Kak. Terima kasih 🙏`;

    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
    );
}



/* =====================================================
   FILTER CATALOGUE
===================================================== */

function filterProducts(
    category,
    button
) {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    const sections =
        document.querySelectorAll(
            ".catalogue-category"
        );


    sections.forEach(section => {

        const sectionCategory =
            section.dataset.categorySection;


        if (
            category === "all" ||
            sectionCategory === category
        ) {

            section.style.display =
                "block";

        } else {

            section.style.display =
                "none";

        }

    });

}



/* =====================================================
   TESTIMONIAL STORAGE
===================================================== */

const testimonialForm =
    document.getElementById(
        "testimonialForm"
    );


const testimonialList =
    document.getElementById(
        "testimonialList"
    );



/* =====================================================
   DEFAULT TESTIMONIAL
===================================================== */

const defaultTestimonials = [

    {

        name:
            "Happy Customer",

        rating:
            5,

        message:
            "Pelayanannya cepat banget dan prosesnya gampang. Suka banget! "

    },


    {

        name:
            "SoftHaven Bestie",

        rating:
            5,

        message:
            "Harganya oke dan adminnya ramah. Bakal order lagi! ♡"

    }

];



/* =====================================================
   GET TESTIMONIAL
===================================================== */

function getTestimonials() {

    const saved =
        localStorage.getItem(
            "birukishuTestimonials"
        );


    if (saved) {

        return JSON.parse(saved);

    }


    return defaultTestimonials;

}



/* =====================================================
   DISPLAY TESTIMONIAL
===================================================== */

function displayTestimonials() {

    const testimonials =
        getTestimonials();


    testimonialList.innerHTML =
        "";


    testimonials
        .slice()
        .reverse()
        .forEach(
            testimonial => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "testimonial-card";


                const stars =
                    "⭐".repeat(
                        testimonial.rating
                    );


                card.innerHTML = `

                    <div class="stars">
                        ${stars}
                    </div>

                    <p>
                        "${escapeHTML(
                            testimonial.message
                        )}"
                    </p>

                    <div class="customer">

                        <div class="avatar">
                            ♡
                        </div>

                        <strong>
                            ${escapeHTML(
                                testimonial.name
                            )}
                        </strong>

                    </div>

                `;


                testimonialList.appendChild(
                    card
                );

            }
        );

}



/* =====================================================
   SUBMIT TESTIMONIAL
===================================================== */

testimonialForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "customerName"
                )
                .value
                .trim();


        const rating =
            Number(
                document
                    .getElementById(
                        "customerRating"
                    )
                    .value
            );


        const message =
            document
                .getElementById(
                    "customerMessage"
                )
                .value
                .trim();


        if (
            !name ||
            !rating ||
            !message
        ) {

            showToast(
                "Isi semuanya dulu yaa "
            );

            return;

        }


        const testimonials =
            getTestimonials();


        testimonials.push({

            name:
                name,

            rating:
                rating,

            message:
                message

        });


        localStorage.setItem(

            "birukishuTestimonials",

            JSON.stringify(
                testimonials
            )

        );


        displayTestimonials();


        testimonialForm.reset();


        showToast(
            "Testimonimu berhasil ditambahkan! ♡"
        );

    }
);



/* =====================================================
   SECURITY
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}



/* =====================================================
   INITIALIZE
===================================================== */

displayTestimonials();



/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "navLinks"
                        )
                        .classList.remove(
                            "active"
                        );

                }
            );

        }
    );