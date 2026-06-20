export function Contact() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
            <p className="text-lg text-gray-700 mb-6 text-justify">
                Si tienes alguna pregunta, comentario o necesitas ayuda con tu compra, no dudes en ponerte en contacto con nosotros.
                Nuestro equipo de atención al cliente está disponible para ayudarte en todo lo que necesites.
            </p>
            <p className="text-lg text-gray-700 mb-6 text-justify">
                Puedes enviarnos un correo electrónico a <a href="mailto:contacto@viborapadelstore.com" className="text-teal-500 underline">contacto@viborapadelstore.com</a> y 
                nos pondremos en contacto contigo lo antes posible.
            </p>
            <p className="text-lg text-gray-700 mb-6 text-justify">
                También puedes llamarnos al <a href="tel:+1234567890" className="text-teal-500 underline">+1 (234) 567-890</a> durante
                nuestro horario de atención, de lunes a viernes de 9:00 a 18:00.
            </p>
            <p className="text-lg text-gray-700 text-justify">
                Si prefieres visitarnos en persona, nuestra tienda está ubicada en:
                <br />
                <strong>Víbora Padel Store</strong>
                <br />
                Calle del Pádel, 123
                <br />
                Ciudad, País
            </p>
        </div>
    );
}   