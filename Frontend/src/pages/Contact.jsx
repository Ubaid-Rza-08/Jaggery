export default function Contact(){
    return(
        <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mt-10">Contact Us</h1>
            <p className="text-center text-gray-600 mt-4">We'd love to hear from you!</p>
            <div className="max-w-md w-full mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Your Message"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
                   </div>
        </div>
        
    )
}