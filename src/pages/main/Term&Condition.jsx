import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-600 hover:underline flex items-center"
      >
        ← Back
      </button>

      {/* Card Container */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-10">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <div className="overflow-y-auto max-h-[70vh] space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            Welcome to our application. By accessing or using our service, you agree to be bound by these Terms and Conditions.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. We reserve the right to terminate accounts or refuse service at our discretion.
          </p>
          <p>
            All content provided through our service is the intellectual property of our company and may not be copied, reproduced, or redistributed without permission.
          </p>
          <p>
            We may update these terms occasionally. It is your responsibility to review them regularly. Continued use of our service constitutes your agreement to any updates.
          </p>
          <p>
            These terms are governed by the laws of your local jurisdiction. Any disputes shall be resolved through the applicable legal channels.
          </p>
          <p>
            For any questions or concerns regarding these terms, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
