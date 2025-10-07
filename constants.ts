import type { Subject, DPPQuestion, RankGoal } from './types';

export const GATE_SYLLABUS: Subject[] = [
  {
    name: 'Engineering Mathematics',
    topics: [
        { name: 'Discrete Mathematics: Propositional and First Order Logic' },
        { name: 'Discrete Mathematics: Sets, Relations, Functions, Partial Orders, Lattices' },
        { name: 'Discrete Mathematics: Monoids, Groups' },
        { name: 'Discrete Mathematics: Graph Connectivity, Matching, Coloring' },
        { name: 'Discrete Mathematics: Combinatorics (Counting, Recurrence Relations, Generating Functions)' },
        { name: 'Linear Algebra: Matrices and Determinants' },
        { name: 'Linear Algebra: System of Linear Equations' },
        { name: 'Linear Algebra: Eigenvalues and Eigenvectors, LU Decomposition' },
        { name: 'Calculus: Limits, Continuity and Differentiability' },
        { name: 'Calculus: Maxima and Minima, Mean Value Theorem' },
        { name: 'Calculus: Integration' },
        { name: 'Probability and Statistics: Random Variables' },
        { name: 'Probability and Statistics: Probability Distributions (Uniform, Normal, Exponential, Poisson, Binomial)' },
        { name: 'Probability and Statistics: Mean, Median, Mode and Standard Deviation' },
        { name: 'Probability and Statistics: Conditional Probability and Bayes Theorem' },
    ]
  },
  {
    name: 'Digital Logic',
    topics: [
      { name: 'Boolean Algebra' },
      { name: 'Combinational Circuits (Adders, Subtractors, Multiplexers, Decoders)' },
      { name: 'Sequential Circuits (Latches, Flip-Flops, Registers, Counters)' },
      { name: 'Minimization of Boolean Expressions (K-Maps)' },
      { name: 'Number Representations (Binary, Floating Point)' },
      { name: 'Computer Arithmetic (Fixed and Floating Point)' },
    ]
  },
  {
    name: 'Computer Organization and Architecture',
    topics: [
      { name: 'Machine Instructions and Addressing Modes' },
      { name: 'ALU, Data-Path and Control Unit' },
      { name: 'Instruction Pipelining and Pipeline Hazards' },
      { name: 'Memory Hierarchy: Cache' },
      { name: 'Memory Hierarchy: Main Memory' },
      { name: 'Memory Hierarchy: Secondary Storage' },
      { name: 'I/O Interface (Interrupt and DMA Mode)' },
    ]
  },
  {
    name: 'Programming and Data Structures',
    topics: [
      { name: 'Programming in C' },
      { name: 'Recursion' },
      { name: 'Arrays' },
      { name: 'Stacks' },
      { name: 'Queues' },
      { name: 'Linked Lists' },
      { name: 'Trees and Binary Trees' },
      { name: 'Binary Search Trees' },
      { name: 'Binary Heaps' },
      { name: 'Graphs' },
    ],
  },
  {
    name: 'Algorithms',
    topics: [
      { name: 'Searching Algorithms (Linear, Binary)' },
      { name: 'Sorting Algorithms (Bubble, Selection, Insertion, Merge, Quick)' },
      { name: 'Hashing' },
      { name: 'Asymptotic Analysis (Worst, Average, Best Case)' },
      { name: 'Algorithm Design: Greedy Approach' },
      { name: 'Algorithm Design: Dynamic Programming' },
      { name: 'Algorithm Design: Divide-and-Conquer' },
      { name: 'Graph Traversal (BFS, DFS)' },
      { name: 'Minimum Spanning Trees (Prim\'s, Kruskal\'s)' },
      { name: 'Shortest Paths (Dijkstra\'s)' },
    ],
  },
  {
    name: 'Theory of Computation',
    topics: [
        { name: 'Regular Expressions and Finite Automata' },
        { name: 'Context-Free Grammars and Push-Down Automata' },
        { name: 'Regular and Context-Free Languages' },
        { name: 'Pumping Lemma for Regular and Context-Free Languages' },
        { name: 'Turing Machines' },
        { name: 'Undecidability' },
    ]
  },
  {
    name: 'Compiler Design',
    topics: [
      { name: 'Phases of a Compiler' },
      { name: 'Lexical Analysis (Tokens, Regular Expressions, Finite Automata)' },
      { name: 'Parsing (Syntax Analysis, CFG, Top-down, Bottom-up)' },
      { name: 'Syntax-Directed Translation' },
      { name: 'Runtime Environments' },
      { name: 'Intermediate Code Generation (Three-Address Code)' },
      { name: 'Local Optimisation and Code Generation' },
      { name: 'Data Flow Analyses (Constant Propagation, Liveness Analysis, CSE)' },
    ]
  },
  {
    name: 'Operating Systems',
    topics: [
      { name: 'System Calls, Processes, Threads' },
      { name: 'Inter-Process Communication' },
      { name: 'Concurrency and Synchronization (Semaphores, Mutexes)' },
      { name: 'Deadlock (Prevention, Avoidance, Detection)' },
      { name: 'CPU Scheduling Algorithms' },
      { name: 'I/O Scheduling' },
      { name: 'Memory Management (Paging, Segmentation)' },
      { name: 'Virtual Memory (Demand Paging, Page Replacement)' },
      { name: 'File Systems' },
    ],
  },
  {
    name: 'Databases',
    topics: [
      { name: 'ER-Model' },
      { name: 'Relational Model: Relational Algebra' },
      { name: 'Relational Model: Tuple Calculus' },
      { name: 'SQL (Structured Query Language)' },
      { name: 'Integrity Constraints' },
      { name: 'Normal Forms (1NF, 2NF, 3NF, BCNF)' },
      { name: 'File Organization' },
      { name: 'Indexing (B and B+ Trees)' },
      { name: 'Transactions and Concurrency Control' },
    ],
  },
  {
    name: 'Computer Networks',
    topics: [
      { name: 'Layering Concepts: OSI and TCP/IP Stacks' },
      { name: 'Switching: Packet, Circuit, and Virtual Circuit' },
      { name: 'Data Link Layer: Framing and Error Detection' },
      { name: 'Data Link Layer: Medium Access Control (MAC)' },
      { name: 'Data Link Layer: Ethernet Bridging' },
      { name: 'Routing: Shortest Path Algorithms (Dijkstra)' },
      { name: 'Routing: Distance Vector and Link State Protocols' },
      { name: 'Network Layer: IP Addressing (IPv4, CIDR)' },
      { name: 'Network Layer: Fragmentation' },
      { name: 'Transport Layer: TCP Basics and Congestion Control' },
      { name: 'Transport Layer: UDP Basics' },
      { name: 'Transport Layer: Sockets' },
      { name: 'Application Layer: DNS' },
      { name: 'Application Layer: SMTP and Email' },
      { name: 'Application Layer: HTTP and FTP' },
    ],
  },
  {
    name: 'General Aptitude',
    topics: [
        { name: 'Verbal: English Grammar and Vocabulary' },
        { name: 'Verbal: Reading Comprehension and Narrative Sequencing' },
        { name: 'Quantitative: Data Interpretation (Charts, Graphs, Tables)' },
        { name: 'Quantitative: Numerical Computation and Estimation' },
        { name: 'Quantitative: Mensuration and Geometry' },
        { name: 'Quantitative: Elementary Statistics and Probability' },
        { name: 'Analytical: Logic (Deduction, Induction, Analogy)' },
        { name: 'Spatial: Transformation of Shapes and Pattern Recognition' },
    ]
  }
];

export const SUBJECT_REVISION_CYCLES: { [key: string]: number } = {
    'Computer Organization and Architecture': 3,
    'Algorithms': 3,
    'Operating Systems': 3,
    'Compiler Design': 3,
    'Theory of Computation': 3,
    'Computer Networks': 2,
    'Databases': 2,
    'Engineering Mathematics': 2,
    'Digital Logic': 2,
    'Programming and Data Structures': 2,
    'General Aptitude': 1,
};

interface GoalStrategy {
  title: string;
  totalHours: number;
  tips: string[];
}

export const GOAL_BASED_STRATEGIES: Record<RankGoal, GoalStrategy> = {
  'Top 100': {
    title: 'Ambitious Target: Top 100',
    totalHours: 1200,
    tips: [
      "Aim for 95-100% syllabus completion.",
      "Complete all revision cycles for every subject.",
      "Target >85% accuracy in DPPs and Mock Tests.",
      "Analyze previous year papers for complex patterns."
    ]
  },
  'Top 500': {
    title: 'Strong Goal: Top 500',
    totalHours: 1000,
    tips: [
      "Ensure 100% completion of high-weightage subjects.",
      "Complete at least 2 revision cycles for core subjects.",
      "Focus on improving speed and accuracy in DPPs.",
      "Practice a wide variety of question types."
    ]
  },
  'Top 1000': {
    title: 'Solid Aim: Top 1000',
    totalHours: 800,
    tips: [
      "Master all fundamental concepts thoroughly.",
      "Complete at least one full revision of the syllabus.",
      "Identify and strengthen your weak areas.",
      "Regularly take subject-wise tests."
    ]
  },
  'Qualify': {
    title: 'First Step: Qualify',
    totalHours: 600,
    tips: [
      "Focus on high-weightage and easy-to-score subjects.",
      "Master General Aptitude and Engineering Mathematics.",
      "Avoid negative marking by attempting only confident questions.",
      "Ensure you are thorough with the basics of all core subjects."
    ]
  }
};


export const DPP_QUESTIONS: DPPQuestion[] = [
    {
        subject: 'Programming and Data Structures',
        question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        answer: 'O(1)',
    },
    {
        subject: 'Programming and Data Structures',
        question: 'Which data structure uses LIFO (Last-In, First-Out)?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        answer: 'Stack',
    },
    {
        subject: 'Algorithms',
        question: 'Which of the following is not a stable sorting algorithm?',
        options: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort'],
        answer: 'Quick Sort',
    },
    {
        subject: 'Databases',
        question: 'Which normal form deals with transitive dependency?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        answer: '3NF',
    },
    {
        subject: 'Operating Systems',
        question: 'The phenomenon of a process spending more time paging than executing is called:',
        options: ['Thrashing', 'Swapping', 'Paging', 'Demand Paging'],
        answer: 'Thrashing',
    },
    {
        subject: 'Digital Logic',
        question: 'The number of minterms in the expression of F(A,B,C) = A\' + B\'C is:',
        options: ['3', '4', '5', '6'],
        answer: '5',
    },
    {
        subject: 'Compiler Design',
        question: 'Which of these is not a phase of a compiler?',
        options: ['Lexical Analysis', 'Code Optimization', 'Code Execution', 'Syntax Analysis'],
        answer: 'Code Execution',
    },
    {
        subject: 'Engineering Mathematics',
        question: 'A fair coin is tossed 3 times. What is the probability of getting exactly 2 heads?',
        options: ['1/8', '2/8', '3/8', '4/8'],
        answer: '3/8',
    },
    {
        subject: 'Computer Networks',
        question: 'Which layer of the OSI model is responsible for routing of packets?',
        options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
        answer: 'Network Layer',
    },
    {
        subject: 'Computer Organization and Architecture',
        question: 'Which of the following is a type of pipeline hazard?',
        options: ['Data Hazard', 'Control Hazard', 'Structural Hazard', 'All of the above'],
        answer: 'All of the above',
    },
    {
        subject: 'Computer Organization and Architecture',
        question: 'What is the purpose of the Program Counter (PC) in a CPU?',
        options: ['Store the address of the next instruction to be executed', 'Store the instruction being executed', 'Store data for the ALU', 'Store temporary results'],
        answer: 'Store the address of the next instruction to be executed',
    },
    {
        subject: 'Theory of Computation',
        question: 'A Pushdown Automaton (PDA) recognizes which class of languages?',
        options: ['Regular Languages', 'Context-Free Languages', 'Context-Sensitive Languages', 'Recursively Enumerable Languages'],
        answer: 'Context-Free Languages',
    },
    {
        subject: 'Theory of Computation',
        question: 'Which of the following languages is NOT context-free?',
        options: ['{a^n b^n | n >= 0}', '{ww | w is in {a,b}*}', '{a^n b^m | n,m >= 0}', '{w c w^R | w is in {a,b}*}'],
        answer: '{ww | w is in {a,b}*}',
    },
    {
        subject: 'General Aptitude',
        question: 'If a car travels at 60 km/h, how far will it travel in 45 minutes?',
        options: ['30 km', '40 km', '45 km', '50 km'],
        answer: '45 km',
    }
];

export const MOTIVATIONAL_QUOTES: string[] = [
    "The secret to getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The expert in anything was once a beginner.",
    "The only way to do great work is to love what you do."
];