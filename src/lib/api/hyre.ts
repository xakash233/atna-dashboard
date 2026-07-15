const DATA_ENGINEER_JD = `data engineer job description At [Company X], we rely on powerfully insightful data to inform our systems and solutions, and we're seeking an experienced pipeline-centric data engineer to put it to good use. The ideal candidate will have the expected mathematical and statistical expertise, combined with a rare curiosity and creativity. This person will wear many hats in the role, but much of the focus will be on building out our Python ETL processes and writing superb SQL. Beyond technical prowess, the data engineer will need soft skills for clearly communicating highly complex data trends to organizational leaders. We're looking for someone willing to jump right in and help the company get the most from its data.

Objectives of this role
Work with data to solve business problems, building and maintaining the infrastructure to answer questions and improve processes
Help streamline our data science workflows, adding value to our product offerings and building out the customer lifecycle and retention models
Work closely with the data science and business intelligence teams to develop data models and pipelines for research, reporting, and machine learning
Be an advocate for best practices and continued learning

Responsibilities
Work closely with our data science team to help build complex algorithms that provide unique insights into our data
Use agile software development processes to make iterative improvements to our back-end systems
Model front-end and back-end data sources to help draw a more comprehensive picture of user flows throughout the system and to enable powerful data analysis
Build data pipelines that clean, transform, and aggregate data from disparate sources
Develop models that can be used to make predictions and answer questions for the overall business

Required skills and qualifications
Three or more years of experience with Python, SQL, and data visualization/exploration tools
Familiarity with the AWS ecosystem, specifically Redshift and RDS
Communication skills, especially for explaining technical concepts to nontechnical business leaders
Ability to work on a dynamic, research-oriented team that has concurrent projects

Preferred skills and qualifications
Bachelor's degree (or equivalent) in computer science, information technology, engineering, or related discipline
Experience in building or maintaining ETL processes
Professional certification
Nice to have : exposure in cloud platforms like AWS , GCP and LLM concepts`;

export type ResumeAgentTab = "open-jobs" | "jobs" | "candidates" | "shortlisting" | "pipeline";

export interface ResumeAgentData {
  metrics: { jobs: number; candidates: number; shortlisted: number };
  openJob: {
    title: string;
    status: "Open";
    description: string;
    resumes: number;
    selected: number;
    jobId: string;
    owner: string;
    createdDate: string;
  };
}

export async function fetchResumeAgent(): Promise<ResumeAgentData> {
  return {
    metrics: { jobs: 1, candidates: 2, shortlisted: 0 },
    openJob: {
      title: "Data engineer",
      status: "Open",
      description: DATA_ENGINEER_JD,
      resumes: 2,
      selected: 0,
      jobId: "JOB-0016",
      owner: "Santhosh Kumar",
      createdDate: "Jul 8, 2026",
    },
  };
}
