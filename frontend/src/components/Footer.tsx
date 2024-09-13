import "../index.css";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="bg-[#5B99C2] relative bottom-0 w-full footer">
      <div className="mx-auto max-w-7xl py-0 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 ">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center order-2"
          aria-label="Footer"
        >
          <div className="px-5">
            <a
              href="#"
              className="text-base text-white hover:text-gray-200"
              target="_blank"
            >
              Hizmet Şartları
            </a>
          </div>

          <div className="px-5">
            <a
              href="#"
              className="text-base text-white hover:text-gray-200"
              target="_blank"
            >
              Gizlilik Politikası
            </a>
          </div>
        </nav>
        <div className="mt-8 md:mb-8 flex justify-center space-x-6 md:order-3  ">
          <a
            href="https://facebook.com"
            className="text-white hover:text-gray-200"
            target="_blank"
          >
            <span className="sr-only">Facebook</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="https://twitter.com"
            className="text-white hover:text-gray-200"
            target="_blank"
          >
            <span className="sr-only">Twitter</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/basksanat4/"
            className="text-white hover:text-gray-200"
            target="_blank"
          >
            <span className="sr-only">Instagram</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.345 3.608 1.32.976.975 1.258 2.243 1.32 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.062 1.366-.345 2.633-1.32 3.608-.975.976-2.243 1.258-3.608 1.32-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.069c-1.366-.062-2.633-.345-3.608-1.32-.976-.975-1.258-2.243-1.32-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.069-4.849c.062-1.366.345-2.633 1.32-3.608.975-.976 2.243-1.258 3.608-1.32 1.265-.058 1.645-.069 4.849-.069m0-2.163c-3.259 0-3.667.014-4.947.072-1.276.058-2.56.337-3.553 1.33-.993.993-1.272 2.277-1.33 3.553-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.276.337 2.56 1.33 3.553.993.993 2.277 1.272 3.553 1.33 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.276-.058 2.56-.337 3.553-1.33.993-.993 1.272-2.277 1.33-3.553.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.276-.337-2.56-1.33-3.553-.993-.993-2.277-1.272-3.553-1.33-1.28-.058-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z" />
            </svg>
          </a>
        </div>
        <div className="mt-8  md:order-1 md:mt-0 ">
          <p className="text-center text-base text-white">
            &copy; Baskı Sanatı Her Hakkı Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
