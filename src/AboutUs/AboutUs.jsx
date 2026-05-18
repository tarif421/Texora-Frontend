import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen my-10 bg-base-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-800 to-sky-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">About Our Company</h1>
        <p className="max-w-2xl mx-auto text-lg">
          We provide high-quality garments production services for bulk orders,
          ensuring premium quality, timely delivery, and full customization.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Company Story */}
        <section className="bg-base-100 p-8 rounded-2xl shadow">
          <h2 className="text-3xl font-bold mb-4 text-indigo-800">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Our journey started with a mission to provide top-quality apparel
            manufacturing solutions. With years of experience in the garments
            industry, we help brands bring their ideas to life through reliable,
            efficient, and scalable production systems.
          </p>
        </section>

        {/* What We Do */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Bulk Production
            </h3>
            <p>
              We specialize in large-scale garments production ensuring
              consistent quality.
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Custom Design
            </h3>
            <p>
              Customize your products according to brand requirements and
              customer needs.
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Fast Delivery
            </h3>
            <p>
              Efficient logistics and tracking system ensures on-time delivery.
            </p>
          </div>
        </section>

        {/*  Why Choose Us */}
        <section className="bg-base-100 p-8 rounded-2xl shadow">
          <h2 className="text-3xl font-bold mb-4 text-indigo-800">
            Why Choose Us?
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>✅ High-quality materials and stitching</li>
            <li>✅ Transparent order tracking system</li>
            <li>✅ Experienced production team</li>
            <li>✅ Competitive pricing</li>
            <li>✅ Reliable customer support</li>
          </ul>
        </section>

        {/*  Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-800">Our Team</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-base-100 p-6 rounded-2xl shadow">
              <div className="w-20 h-20 bg-indigo-200 rounded-full mx-auto mb-3"></div>
              <h4 className="font-bold">Production Manager</h4>
              <p className="text-sm text-gray-500">
                Oversees manufacturing process
              </p>
            </div>

            <div className="bg-base-100 p-6 rounded-2xl shadow">
              <div className="w-20 h-20 bg-indigo-200 rounded-full mx-auto mb-3"></div>
              <h4 className="font-bold">Quality Control</h4>
              <p className="text-sm text-gray-500">Ensures product standards</p>
            </div>

            <div className="bg-base-100 p-6 rounded-2xl shadow">
              <div className="w-20 h-20 bg-indigo-200 rounded-full mx-auto mb-3"></div>
              <h4 className="font-bold">Support Team</h4>
              <p className="text-sm text-gray-500">Helps customers anytime</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
