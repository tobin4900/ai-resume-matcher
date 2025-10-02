import React, { useState } from "react";

export default function ResumeMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) {
      setError("Please upload a resume and enter a job description.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("job_description", jobDescription);

      const response = await fetch("http://127.0.0.1:8000/match_resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response from server");
      }

      setResult(data.result || "No result returned");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Resume Matcher</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Job Description: <br />
            <input
              type="text"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="e.g. Python Developer"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>
        <div>
          <label>
            Upload Resume (PDF): <br />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              style={{ marginBottom: 10 }}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Matching..." : "Match Resume"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", whiteSpace: "pre-wrap", marginTop: 20 }}>
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            whiteSpace: "pre-wrap",
            background: "black",
            padding: 15,
            marginTop: 20,
            borderRadius: 4,
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
