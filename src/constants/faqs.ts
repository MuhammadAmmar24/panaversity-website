export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What is a Certified Agentic and Robotic AI Engineer?",
    answer: `<p>A Certified Agentic and Robotic AI Engineer is a professional skilled in developing autonomous AI systems. These systems can act and make decisions independently (agentic AI) and interact with the physical world (robotic or physical AI).</p>
    <p>This Panaversity certification program equips you with the expertise to build and deploy:</p>
    <ul>
      <li><strong>Autonomous software agents</strong></li>
      <li><strong>Humanoid robots</strong></li>
      <li><strong>Fine-tuned large language models (LLMs)</strong></li>
    </ul>
    <p>The program covers:</p>
    <ul>
      <li><strong>Agentic AI: </strong>Building AI systems capable of autonomous learning, perception, reasoning, and action. This includes multi-agent AI systems, AI-powered SaaS solutions, and knowledge graphs.</li>
      <li><strong>Humanoid Robotics and Physical AI: </strong>Designing, simulating, and deploying robots capable of natural interactions with humans using platforms like ROS 2 and NVIDIA Isaac.</li>
      <li><strong>Cloud Native and Distributed Computing: </strong>Constructing scalable AI-powered microservices using Docker, Kubernetes, and Ray for cloud-native and distributed applications.</li>
      <li><strong>Custom GPT and LLM Fine-Tuning: </strong>Customizing LLMs for specific applications using tools like PyTorch and FastAI.</li>
      <li><strong>AI Ethics and Governance: </strong>Understanding principles and practices for responsible AI use.</li>
    </ul>
    <p>This curriculum prepares you to become a leader in the expanding AI field.</p>
    `,
  },

  {
    question: "Why should I choose this program?",
    answer: `<p>This program offers several compelling reasons to enroll:</p>
    <ul>
      <li><strong>High-Demand Skills: </strong>Develop sought-after skills in intelligent, scalable cloud applications using Generative AI and Cloud Native technologies.</li>
      <li><strong>Industry-Ready: </strong>Prepare for global certifications, startup and freelance opportunities after just six months.</li>
      <li><strong>Future-Proof Your Career: </strong>Stay ahead of the curve in a rapidly evolving tech landscape.</li>
    </ul>
    <p>You'll gain expertise in:</p>
    <ul>
      <li><strong>Multi-Agent Systems and Custom GPTs: </strong>Fine-tuning foundational AI models for specific tasks and automating business processes.</li>
      <li><strong>Physical AI and Humanoid Robotics: </strong>Designing, simulating, and deploying advanced humanoid robots.</li>
      <li><strong>AI-Powered Microservices: </strong>Mastering Python, building APIs, and leveraging cutting-edge GenAI APIs.</li>
      <li><strong>Cloud Native Expertise: </strong>Designing and deploying cloud-native applications using Docker, Kubernetes, Terraform, and GitHub Actions.</li>
      <li><strong>Distributed System Design: </strong>Building systems that run on multiple computers using Ray.</li>
      <li><strong>AI Solution Design: </strong>Leveraging Design Thinking and Behavior Driven Development (BDD) to create user-centric AI solutions.</li>
      <li><strong>Fine-Tuning Open-Source LLMs: </strong>Fine-tuning models like Meta LLaMA 3 using PyTorch, Ray, and Fast AI for cloud-native training and deployment.</li>
      <li><strong>Flexible Learning: </strong>Earn while you learn by freelancing or contributing to projects after the third quarter.</li>
    </ul>
    `,
  },
  {
    question: "What is the potential for starting my own company?",
    answer: `<p>This certification positions you as a prime candidate for launching successful AI startups:</p>
    <ul>
      <li><strong>Emerging Market Demand: </strong>There's a growing deman for tailored AI solutions, and certified engineers can develop autonomous agents and AI systems for niche markets.</li>
      <li><strong>Differentiation: </strong>Your skills in agentic and physical AI allow you to create products that bridge digital and physical experiences, setting you apart from the competition.</li>
      <li><strong>Lean Startup Operations: </strong>Your full-stack AI knowledge enables you to handle much of the development yourself, reducing costs and enabling rapid prototyping.</li>
      <li><strong>Funding Opportunities: </strong>Investors are actively seeking AI and robotics startups, and your expertise makes your venture attractive to them.</li>
      <li><strong>Market Adaptability: </strong>The program's breadth allows you to adapt to market demands and pivot your offerings based on feedback.</li>
      <li><strong>Scalability and Innovation: </strong>You can build robust, scalable AI systems using cloud-native development and distributed computing tools.</li>
      <li><strong>Lowered Barriers to Entry: </strong>Cloud platforms and generative AI APIs reduce the resource intensity of robotics and AI development, making it easier to launch your startup.</li>
      <li><strong>Long-Term Vision: </strong>The program equips you to anticipate and address future industry transformations driven by AI.</li>
    </ul>
    `,
  },

  {
    question:
      "Why is Python used for API development instead of TypeScript (Node.js)?",
    answer: `<p>While TypeScript is gaining popularity for web development, Python remains the dominant language in the AI community. This is due to: </p>
    <ul>
      <li><strong>Python's AI Dominance: </strong>Python is the de facto standard for AI development, with a vast ecosystem of AI-specific libraries and frameworks.</li>
      <li><strong>Library Updates: </strong>New libraries and updates are frequently released for Python first, allowing you to leverage the latest advancements.</li>
      <li><strong>Community and Resources: </strong>Python has a larger and more established AI community, offering ample resources and support.</li>
    </ul>
    `,
  },

  {
    question:
      "What are the benefits of using Docker, Docker Compose, and Kubernetes?",
    answer: `<p>These technologies offer significant advantages for development, testing, and deployment:</p>
    <strong>Docker Containers: </strong>
    <ul>
      <li><strong>Consistent Environment: </strong>Package software into a portable unit that runs consistently across different machines and operating systems.</li>
      <li><strong>Cross-Platform Flexibility: </strong>Ideal for deploying applications on various platforms, including cloud services.</li>
    </ul>
    <strong>Docker Compose: </strong>
    <ul>
      <li><strong>Multi-Container Management: </strong>Define and manage multi-container applications with a single YAML file.</li>
      <li><strong>Simplified Orchestration: </strong>Describe services, configurations, dependencies, and interactions in a single file, making it easier to manage complex applications.</li>
    </ul>
        <strong>Kubernetes: </strong>
    <ul>
      <li><strong>Automated Container Orchestration: </strong>Automates container deployment, scaling, and management across a cluster of machines.</li>
      <li><strong>High Availability and Scalability: </strong>Ensures application uptime and handles increased traffic by distributing containers across multiple nodes.</li>
      <li><strong>Resource Optimization: </strong>Efficiently manages resources, such as CPU and memory allocation, across the cluster.</li>
    </ul>
    `,
  },
  {
    question:
      "What are the advantages of using open technologies like Docker, Kubernetes, and Terraform?",
    answer: `<p>Open technologies offer several benefits compared to relying solely on proprietary cloud services: </p>
    <strong>Portability and Flexibility:</strong>
    <ul>
      <li><strong>Vendor Agnostic: </strong>Operate across any cloud provider or on-premises infrastructure without vendor lock-in.</li>
      <li><strong>Easy Migration: </strong>Move applications seamlessly across environments thanks to containerization and Kubernetes' consistent orchestration.</li>
    </ul>
    <strong>Cost Efficiency:</strong>
    <ul>
      <li><strong>Avoid Vendor Lock-In: </strong> Leverage competitive pricing from multiple providers or use on-premises resources.</li>
      <li><strong>Optimized Resource Utilization: </strong>Kubernetes manages resources efficiently, potentially reducing costs.</li>
    </ul>
    <strong>Community and Ecosystem:</strong>
    <ul>
      <li><strong>Open Source: </strong>Supported by active communities that continually enhance the software, offer support, and share best practices.</li>
      <li><strong>Rich Ecosystem: </strong>Access a wide range of tools and integrations to meet your specific needs.</li>
    </ul>
    <strong>Standardisation and Consistency: </strong>
    <ul>
      <li><strong>Unified Platform: </strong>Docker, Kubernetes, and Terraform provide a unified platform for container orchestration, infrastructure management, and consistent development.</li>
      <li><strong>Simplified Management: </strong>Manage infrastructure as code with Terraform, ensuring reproducibility and consistency.</li>
    </ul>
    `,
  },
  {
    question:
      "What are the benefits of using Python-based FastAPI and related technologies?",
    answer: `<p>FastAPI and its associated technologies offer several advantages for API development: </p>
    <strong>FastAPI:</strong>
    <ul>
      <li><strong>High Performance: </strong>A high-performance framework designed for speed and efficiency.</li>
      <li><strong>Lightweight and Easy to Use: </strong> Simplifies API development with a clear and intuitive syntax.</li>
      <li><strong>Scalable and Secure: </strong>Built for scalability and security, meeting the demands of modern applications.</li>
      <li><strong>Broad Compatibility: </strong>Easily integrates with various tools, databases, and external services.</li>
    </ul>
    <strong>Related Technologies:</strong>
    <ul>
      <li><strong>Pydantic: </strong>Enables data validation and serialization, ensuring data integrity and improving code quality.</li>
      <li><strong>GQL (Graph Query Language): </strong>An ISO standard query language for querying property graphs, allowing standardized graph data management.</li>
      <li><strong>Neo4j: </strong>A scalable graph database management system widely used for handling complex data relationships.</li>
    </ul>
    `,
  },
  {
    question:
      "What are the benefits of using Docker Containers for development, testing, and deployment?",
    answer: `<p>Docker Containers offer several advantages throughout the software development lifecycle:</p>
    <strong>Development:</strong>
    <ul>
      <li><strong>Isolated Environments: </strong>Set up isolated environments for different projects, avoiding dependency conflicts and ensuring consistency.</li>
      <li><strong>Reproducibility: </strong>Achieve consistent development environments across teams, simplifying collaboration and reducing "works on my machine" issues.</li>
      <li><strong>Faster Setup: </strong>Rapidly set up and tear down development environments, accelerating the development workflow.</li>
    </ul>
    <strong>Testing:</strong>
    <ul>
      <li><strong>Consistent Testing Environments: </strong>Run tests in isolated containers that mimic the production environment, improving test reliability and accuracy of test results.</li>
      <li><strong>Parallel Testing: </strong>Execute tests concurrently across multiple containers to speed up the testing process.</li>
    </ul>
    <strong>Deployment:</strong>
    <ul>
      <li><strong>Simplified Deployment: </strong>Package applications and dependencies into containers,  enabling straightforward deployment to various environments.</li>
      <li><strong>Version Control: </strong>Easily manage different application versions through Docker images.</li>
      <li><strong>Scalability: </strong>Scale applications efficiently by deploying multiple containers across a cluster as needed.</li>
    </ul>
    `,
  },
  {
    question: "What is Physical AI?",
    answer: `<p>Physical AI integrates artificial intelligence with physical entities, enabling them to operate and interact in the real world.</p>
    <strong>Key characteristics:</strong>
    <ul>
      <li><strong>Real-World Interaction: </strong>Perceiving the environment through sensors and taking actions using actuators.</li>
      <li><strong>Embodiment: </strong> AI embedded in physical bodies, like robots, allowing interaction with the physical world.</li>
      <li><strong>Understanding Physics: </strong>Comprehending and adhering to physical laws like gravity and friction.</li>
      <li><strong>Human-like Functionality: </strong>Performing tasks in human-designed environments using human-like form factors.</li>
      <li><strong>Data-Driven Training: </strong>Leveraging real-world data to improve performance through machine learning.</li>
    </ul>
    <strong>Applications:</strong>
    <ul>
      <li><strong>Healthcare: </strong>Assistive robots supporting patient care, rehabilitation, and surgical tasks.</li>
      <li><strong>Service Industry: </strong>Robots for cleaning, delivery, and customer service roles./li>
      <li><strong>Manufacturing: </strong>Industrial robots for assembly, inventory management, and quality control.</li>
      <li><strong>Exploration: </strong>Robots for exploring challenging environments like space or underwater.</li>
    </ul>
    `,
  },
];
