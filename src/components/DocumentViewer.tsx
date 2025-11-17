import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const DocumentViewer: React.FC = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	if (!state) {
		return (
			<div className="p-8">
				<p className="text-gray-600">Document not found.</p>
			</div>
		);
	}

	const { title, file } = state;

	return (
		<div className="p-6">
			<button
				className="flex items-center gap-2 text-blue-700 mb-4"
				onClick={() => navigate(-1)}
			>
				<ArrowLeft />
				Back
			</button>

			<h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>

			<iframe
				src={file}
				className="w-full h-[85vh] border rounded-lg shadow"
				title={title}
			/>
		</div>
	);
};
