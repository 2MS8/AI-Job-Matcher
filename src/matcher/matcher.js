// Matcher Engine - Job Matcher Extension (NLP Powered)
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

/**
 * Comprehensive skill/keyword dictionary organized by categories.
 */
const SKILL_DICTIONARY = {
    'Programming Languages': [
        'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'csharp', 'ruby', 'go', 'golang',
        'rust', 'swift', 'kotlin', 'scala', 'php', 'perl', 'r', 'matlab', 'dart', 'lua',
        'objective-c', 'assembly', 'vba', 'groovy', 'clojure', 'elixir', 'erlang', 'haskell',
        'fortran', 'cobol', 'julia', 'solidity', 'apex', 'delphi', 'pascal', 'ada', 'prolog',
        'lisp', 'scheme', 'racket', 'f#', 'fsharp', 'vb.net', 'visual basic', 'powershell',
        'abap', 'pl/sql', 't-sql', 'bash', 'shell', 'zsh', 'fish', 'awk', 'sed', 'verilog',
        'vhdl', 'labview', 'scratch', 'blockly', 'actionscript', 'coffeescript', 'haml',
        'pug', 'ejs', 'handlebars', 'jinja', 'twig', 'smarty', 'blade', 'razor'
    ],
    'Frontend': [
        'react', 'reactjs', 'react.js', 'angular', 'angularjs', 'vue', 'vuejs', 'vue.js',
        'svelte', 'next.js', 'nextjs', 'nuxt', 'nuxtjs', 'gatsby', 'html', 'html5',
        'css', 'css3', 'sass', 'scss', 'less', 'tailwind', 'tailwindcss', 'bootstrap',
        'material-ui', 'mui', 'chakra', 'ant design', 'styled-components', 'emotion',
        'webpack', 'vite', 'parcel', 'rollup', 'babel', 'jquery', 'redux', 'mobx',
        'zustand', 'recoil', 'graphql', 'apollo', 'pwa', 'responsive design',
        'cross-browser', 'accessibility', 'a11y', 'wcag', 'seo', 'web components',
        'storybook', 'figma', 'sketch', 'adobe xd', 'webgl', 'three.js', 'canvas',
        'svg', 'animation', 'gsap', 'framer motion', 'electron', 'tauri', 'preact',
        'lit', 'alpine.js', 'stimulus', 'htmx', 'turbo', 'livewire', 'd3.js', 'chart.js',
        'highcharts', 'leaflet', 'mapbox', 'openlayers', 'cesium', 'babylon.js',
        'pixi.js', 'phaser', 'unity', 'webassembly', 'wasm', 'micro-frontends',
        'module federation', 'mfes', 'web workers', 'service workers', 'indexeddb',
        'localstorage', 'sessionstorage', 'cookies', 'jwt', 'oauth2', 'openid'
    ],
    'Backend': [
        'node.js', 'nodejs', 'express', 'expressjs', 'fastify', 'nestjs', 'nest.js',
        'django', 'flask', 'fastapi', 'spring', 'spring boot', 'springboot',
        'rails', 'ruby on rails', 'laravel', 'symfony', 'asp.net', '.net', 'dotnet',
        'gin', 'echo', 'fiber', 'actix', 'rocket', 'microservices', 'monolith',
        'rest', 'restful', 'api', 'grpc', 'websocket', 'socket.io', 'oauth',
        'jwt', 'authentication', 'authorization', 'middleware', 'orm', 'prisma',
        'sequelize', 'typeorm', 'hibernate', 'sqlalchemy', 'mongoose', 'redis',
        'bull', 'sidekiq', 'resque', 'celery', 'rabbitmq', 'activemq', 'zeromq',
        'kafka', 'pulsar', 'nats', 'graphql', 'apollo', 'relay', 'hasura',
        'postgraphile', 'prisma', 'trpc', 'soap', 'xml-rpc', 'json-rpc',
        'cors', 'helmet', 'rate limiting', 'throttling', 'caching', 'memcached',
        'varnish', 'haproxy', 'nginx', 'apache', 'tomcat', 'jboss', 'wildfly',
        'weblogic', 'websphere', 'iis', 'kestrel', 'uvicorn', 'gunicorn'
    ],
    'Database': [
        'sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch',
        'dynamodb', 'cassandra', 'couchdb', 'firebase', 'firestore', 'supabase',
        'sqlite', 'oracle', 'mssql', 'sql server', 'mariadb', 'neo4j', 'graphdb',
        'influxdb', 'timescaledb', 'cockroachdb', 'memcached', 'etcd', 'zookeeper',
        'hbase', 'accumulo', 'bigtable', 'spanner', 'cosmos db', 'table storage',
        'blob storage', 's3', 'minio', 'ceph', 'glusterfs', 'clickhouse', 'druid',
        'pinot', 'kudu', 'presto', 'trino', 'hive', 'impala', 'athena', 'redshift',
        'snowflake', 'bigquery', 'databricks', 'synapse', 'vertica', 'greenplum',
        'teradata', 'netezza', 'exasol', 'single store', 'memsql', 'voltdb',
        'scylladb', 'yugabytedb', 'couchbase', 'rethinkdb', 'arangodb',
        'orientdb', 'ravendb', 'marklogic', 'datomic', 'datomic', 'fauna',
        'planetscale', 'neon', 'cockroachdb', 'tidb', 'oceanbase'
    ],
    'Cloud & DevOps': [
        'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'cloud',
        'docker', 'kubernetes', 'k8s', 'terraform', 'ansible', 'puppet', 'chef',
        'jenkins', 'ci/cd', 'cicd', 'github actions', 'gitlab ci', 'circleci',
        'travis', 'bamboo', 'argo', 'helm', 'istio', 'envoy', 'nginx', 'apache',
        'load balancing', 'auto scaling', 'serverless', 'lambda', 'fargate',
        'ecs', 'eks', 'ec2', 's3', 'cloudfront', 'route53', 'vpc', 'iam',
        'cloudformation', 'cdk', 'pulumi', 'vagrant', 'packer', 'consul',
        'vault', 'prometheus', 'grafana', 'datadog', 'new relic', 'splunk',
        'elk', 'logstash', 'kibana', 'cloudwatch', 'monitoring', 'logging',
        'observability', 'sre', 'devops', 'devsecops', 'infrastructure as code',
        'iac', 'linux', 'unix', 'bash', 'shell scripting', 'powershell',
        'openshift', 'rancher', 'nomad', 'spinnaker', 'flux', 'jenkins x',
        'tekton', 'buildpacks', 'jib', 'skaffold', 'tilt', 'devspace',
        'kustomize', 'jsonnet', 'cue', 'docker-compose', 'docker swarm',
        'mesos', 'marathon', 'aurora', 'chronos', 'saltstack', 'salt',
        'cloud-init', 'user-data', 'metadata', 'firewalls', 'security groups',
        'nacls', 'waf', 'shield', 'guardduty', 'inspector', 'security hub',
        'compliance', 'soc2', 'iso27001', 'hipaa', 'gdpr', 'pci-dss'
    ],
    'Data & AI/ML': [
        'machine learning', 'deep learning', 'artificial intelligence', 'ai', 'ml',
        'nlp', 'natural language processing', 'computer vision', 'neural network',
        'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'sklearn', 'pandas',
        'numpy', 'scipy', 'matplotlib', 'seaborn', 'plotly', 'jupyter',
        'data science', 'data analysis', 'data engineering', 'data pipeline',
        'etl', 'elt', 'data warehouse', 'data lake', 'spark', 'hadoop',
        'hive', 'kafka', 'airflow', 'dbt', 'snowflake', 'bigquery',
        'redshift', 'tableau', 'power bi', 'looker', 'metabase',
        'statistics', 'a/b testing', 'hypothesis testing', 'regression',
        'classification', 'clustering', 'recommendation', 'llm', 'gpt',
        'bert', 'transformer', 'generative ai', 'prompt engineering',
        'langchain', 'rag', 'vector database', 'embeddings', 'openai',
        'hugging face', 'mlops', 'model deployment', 'feature engineering',
        'xgboost', 'lightgbm', 'catboost', 'random forest', 'decision tree',
        'svm', 'k-means', 'pca', 'tsne', 'umap', 'dimensionality reduction',
        'time series', 'forecasting', 'arima', 'prophet', 'lstm', 'gru',
        'cnn', 'rnn', 'gan', 'vae', 'diffusion models', 'reinforcement learning',
        'rl', 'q-learning', 'policy gradient', 'transformers', 'attention',
        'word2vec', 'glove', 'fasttext', 'bert', 'roberta', 'distilbert',
        't5', 'bart', 'gpt-3', 'gpt-4', 'claude', 'palm', 'llama', 'mistral',
        'falcon', 'gemma', 'olmo', 'mixtral', 'dbrx', 'command-r', 'cohere',
        'anthropic', 'perplexity', 'together ai', 'replicate', 'modal',
        'wandb', 'mlflow', 'dvc', 'dagshub', 'kubeflow', 'polyaxon',
        'clearml', 'neptune', 'comet', 'gradio', 'streamlit', 'dash'
    ],
    'Mobile': [
        'android', 'ios', 'react native', 'flutter', 'xamarin', 'ionic',
        'cordova', 'capacitor', 'swift', 'swiftui', 'kotlin', 'jetpack compose',
        'objective-c', 'cocoapods', 'gradle', 'xcode', 'android studio',
        'mobile development', 'app development', 'push notifications',
        'mobile testing', 'appium', 'detox', 'expo', 'fragment', 'activity',
        'viewmodel', 'livedata', 'databinding', 'navigation component',
        'room', 'realm', 'sqlite', 'core data', 'user defaults', 'keychain',
        'firebase', 'fcm', 'apns', 'in-app purchases', 'iap', 'subscriptions',
        'ads', 'admob', 'analytics', 'crashlytics', 'performance monitoring',
        'deep linking', 'universal links', 'app links', 'widgets', 'complications',
        'watchos', 'tvos', 'ipados', 'macos', 'catalyst', 'mac catalyst',
        'cross-platform', 'hybrid', 'pwa', 'twa', 'trusted web activity'
    ],
    'Testing & QA': [
        'testing', 'unit testing', 'integration testing', 'e2e testing',
        'end-to-end', 'jest', 'mocha', 'chai', 'cypress', 'playwright',
        'selenium', 'puppeteer', 'junit', 'pytest', 'rspec', 'testng',
        'karma', 'jasmine', 'vitest', 'testing library', 'enzyme',
        'tdd', 'bdd', 'test-driven', 'behavior-driven', 'qa', 'quality assurance',
        'load testing', 'performance testing', 'jmeter', 'k6', 'gatling',
        'postman', 'insomnia', 'swagger', 'api testing', 'mocking', 'stubbing',
        'code coverage', 'sonarqube', 'code review', 'static analysis',
        'functional testing', 'regression testing', 'smoke testing',
        'sanity testing', 'acceptance testing', 'uat', 'user acceptance',
        'exploratory testing', 'ad-hoc testing', 'usability testing',
        'accessibility testing', 'a11y', 'compatibility testing',
        'cross-browser', 'visual testing', 'percy', 'applitools', 'chromatic',
        'contract testing', 'pact', 'consumer-driven', 'provider-driven',
        'security testing', 'penetration testing', 'vulnerability scanning',
        'fuzzing', 'chaos engineering', 'chaos monkey', 'gremlin',
        'test automation', 'automation framework', 'cucumber', 'gherkin',
        'specflow', 'behave', 'lettuce', 'robot framework', 'sahi',
        'testcomplete', 'ranorex', 'tricentis', 'qtest', 'zephyr',
        'testrail', 'xray', 'qmetry', 'testlink', 'mantis', 'bugzilla',
        'jira', 'azure devops', 'test management', 'defect tracking'
    ],
    'Tools & Practices': [
        'git', 'github', 'gitlab', 'bitbucket', 'svn', 'mercurial',
        'jira', 'confluence', 'trello', 'asana', 'notion', 'slack',
        'agile', 'scrum', 'kanban', 'lean', 'sprint', 'standup',
        'waterfall', 'sdlc', 'design patterns', 'solid', 'dry', 'kiss',
        'clean code', 'refactoring', 'code review', 'pair programming',
        'version control', 'branching strategy', 'gitflow',
        'documentation', 'technical writing', 'architecture',
        'system design', 'scalability', 'performance optimization',
        'caching', 'cdn', 'security', 'owasp', 'encryption',
        'ssl', 'tls', 'https', 'cors', 'csrf', 'xss',
        'penetration testing', 'vulnerability assessment', 'threat modeling',
        'incident response', 'disaster recovery', 'business continuity',
        'backup', 'restore', 'replication', 'failover', 'high availability',
        'fault tolerance', 'graceful degradation', 'circuit breaker',
        'retry', 'timeout', 'deadline', 'bulkhead', 'rate limiting',
        'api gateway', 'service mesh', 'sidecar', 'ambassador', 'adapter',
        'strangler pattern', 'blue-green deployment', 'canary deployment',
        'feature flags', 'toggle', 'a/b testing', 'dark launch',
        'chaos engineering', 'chaos monkey', 'simian army', 'game day',
        'post-mortem', 'blameless', 'root cause analysis', 'rca',
        'incident management', 'on-call', 'pagerduty', 'opsgenie',
        'victorops', 'xmatters', 'statuspage', 'uptime', 'sla', 'slo', 'sli',
        'error budget', 'cost optimization', 'finops', 'cloud economics'
    ],
    'Soft Skills': [
        'communication', 'teamwork', 'collaboration', 'leadership',
        'problem solving', 'problem-solving', 'analytical', 'critical thinking',
        'time management', 'project management', 'mentoring', 'coaching',
        'presentation', 'public speaking', 'stakeholder management',
        'cross-functional', 'self-motivated', 'proactive', 'adaptable',
        'detail-oriented', 'attention to detail', 'multitasking',
        'deadline-driven', 'fast-paced', 'innovative', 'creative',
        'strategic thinking', 'decision making', 'conflict resolution',
        'negotiation', 'customer-focused', 'client-facing', 'remote work',
        'empathy', 'emotional intelligence', 'eq', 'active listening',
        'feedback', 'constructive criticism', 'patience', 'flexibility',
        'resilience', 'stress management', 'work-life balance', 'boundaries',
        'prioritization', 'organization', 'planning', 'execution',
        'follow-through', 'accountability', 'ownership', 'initiative',
        'drive', 'ambition', 'curiosity', 'continuous learning', 'growth mindset',
        'adaptability', 'agility', 'open-mindedness', 'inclusivity', 'diversity',
        'cultural awareness', 'global mindset', 'interpersonal skills',
        'relationship building', 'networking', 'influence', 'persuasion',
        'diplomacy', 'tact', 'political savvy', 'organizational awareness',
        'business acumen', 'commercial awareness', 'industry knowledge',
        'domain expertise', 'thought leadership', 'vision', 'mission-driven'
    ],
    'Certifications & Qualifications': [
        'aws certified', 'azure certified', 'gcp certified', 'pmp',
        'scrum master', 'csm', 'psm', 'safe', 'itil', 'comptia',
        'cissp', 'ceh', 'ccna', 'ccnp', 'cka', 'ckad',
        'bachelor', 'master', 'phd', 'b.tech', 'b.e', 'm.tech', 'm.e',
        'mba', 'bca', 'mca', 'b.sc', 'm.sc', 'degree', 'diploma',
        'certification', 'certified', 'mcsd', 'mcse', 'mcitp', 'mcp',
        'ocp', 'ocmj', 'ocwcd', 'ocpjd', 'scjp', 'scmad', 'scwcd',
        'scbcd', 'scmad', 'scdjws', 'scmad', 'scmad', 'scmad', 'scmad',
        'lpic', 'rhcsa', 'rhce', 'rhca', 'lfcs', 'lfce', 'cks', 'cisa',
        'cism', 'crisc', 'cgeit', 'cfa', 'cpa', 'cia', 'cma', 'cgma',
        'acca', 'aca', 'cima', 'cipd', 'cmi', 'chrp', 'shrm', 'phr', 'sphr',
        'gphr', 'gpHR', 'cebs', 'cbs', 'clu', 'chfc', 'cfp', 'cfa', 'caia',
        'frm', 'prm', 'cipm', 'cips', 'cscp', 'cltd', 'cpm', 'cpp', 'cpe',
        'ccem', 'cem', 'leed', 'breeam', 'well', 'fitwel', 'green globes'
    ],
    'Project Management': [
        'project management', 'program management', 'portfolio management',
        'agile', 'scrum', 'kanban', 'lean', 'waterfall', 'hybrid',
        'pmp', 'prince2', 'agile certified', 'safe', 'less', 'da',
        'jira', 'confluence', 'trello', 'asana', 'monday.com', 'airtable',
        'smartsheet', 'wrike', 'teamwork', 'basecamp', 'clickup',
        'notion', 'todoist', 'omnifocus', 'things', 'remember the milk',
        'gantt chart', 'pert chart', 'network diagram', 'critical path',
        'work breakdown structure', 'wbs', 'risk management', 'issue tracking',
        'change management', 'configuration management', 'release management',
        'deployment management', 'environment management', 'stakeholder analysis',
        'communication plan', 'status reporting', 'dashboard', 'kpi', 'metric',
        'budget management', 'cost control', 'resource allocation', 'capacity planning',
        'demand management', 'forecasting', 'estimation', 'planning poker',
        'story points', 'velocity', 'burn down', 'burn up', 'cumulative flow',
        'cycle time', 'lead time', 'throughput', 'wip limits', 'kaizen',
        'continuous improvement', 'retrospective', 'sprint planning', 'daily standup',
        'sprint review', 'sprint retrospective', 'backlog grooming', 'refinement'
    ],
    'Sales & Marketing': [
        'sales', 'business development', 'account management', 'key account',
        'b2b', 'b2c', 'saas sales', 'enterprise sales', 'sdr', 'bdr', 'ae',
        'sales operations', 'sales enablement', 'crm', 'salesforce', 'hubspot',
        'pipedrive', 'zoho', 'dynamics 365', 'marketing', 'digital marketing',
        'content marketing', 'social media', 'seo', 'sem', 'ppc', 'google ads',
        'facebook ads', 'linkedin ads', 'email marketing', 'marketing automation',
        'marketo', 'pardot', 'eloqua', 'hubspot', 'mailchimp', 'constant contact',
        'campaign monitor', 'activecampaign', 'convertkit', 'drip', 'klaviyo',
        'customer success', 'customer experience', 'cx', 'ux', 'customer journey',
        'funnel', 'conversion', 'lead generation', 'lead nurturing', 'lead scoring',
        'demand generation', 'inbound marketing', 'outbound marketing', 'abm',
        'account-based marketing', 'product marketing', 'product management',
        'brand management', 'brand strategy', 'positioning', 'messaging',
        'go-to-market', 'gtm', 'launch', 'product launch', 'campaign management',
        'market research', 'competitive analysis', 'swot', 'pest', 'porter\'s five forces',
        'customer segmentation', 'targeting', 'positioning', 'value proposition',
        'unique selling proposition', 'usp', 'pricing', 'packaging', 'promotion',
        'distribution', 'channel management', 'partner management', 'alliances'
    ],
    'Finance & Accounting': [
        'accounting', 'finance', 'financial analysis', 'financial planning',
        'budgeting', 'forecasting', 'variance analysis', 'financial reporting',
        'month-end close', 'quarter-end close', 'year-end close', 'audit',
        'internal audit', 'external audit', 'sox', 'sarbanes-oxley', 'compliance',
        'tax', 'tax preparation', 'tax planning', 'tax compliance', 'corporate tax',
        'individual tax', 'international tax', 'transfer pricing', 'vat', 'gst',
        'payroll', 'payroll processing', 'payroll tax', 'benefits administration',
        'accounts payable', 'ap', 'accounts receivable', 'ar', 'general ledger',
        'gl', 'fixed assets', 'inventory accounting', 'cost accounting',
        'management accounting', 'financial modeling', 'valuation', 'dcf',
        'comps', 'precedent transactions', 'm&a', 'mergers and acquisitions',
        'due diligence', 'integration', 'divestiture', 'carve-out', 'ipo',
        'capital raising', 'debt financing', 'equity financing', 'venture capital',
        'private equity', 'investment banking', 'corporate development',
        'treasury', 'cash management', 'risk management', 'hedging',
        'foreign exchange', 'fx', 'interest rate', 'derivatives', 'options',
        'futures', 'swaps', 'credit', 'lending', 'underwriting', 'credit analysis',
        'financial statements', 'balance sheet', 'income statement', 'cash flow',
        'statement of cash flows', 'footnotes', 'md&a', '10-k', '10-q', '8-k',
        'annual report', 'quarterly report', 'sec filing', 'edgar', 'xbrl'
    ],
    'Human Resources': [
        'hr', 'human resources', 'talent acquisition', 'recruitment', 'sourcing',
        'screening', 'interviewing', 'assessment', 'selection', 'onboarding',
        'offboarding', 'employee relations', 'employee engagement', 'retention',
        'turnover', 'attrition', 'hrbp', 'hr business partner', 'hr generalist',
        'hr specialist', 'hr manager', 'hr director', 'chro', 'hr operations',
        'hr shared services', 'hrss', 'hr information system', 'hrms', 'hris',
        'workday', 'successfactors', 'peoplesoft', 'oracle hcm', 'sap hcm',
        'bamboo', 'gusto', 'zenefits', 'justworks', 'rippling', 'deel', 'remote',
        'performance management', 'performance review', 'appraisal', 'feedback',
        'goal setting', 'okr', 'kpi', 'competency', 'competency model',
        'career development', 'career path', 'succession planning', 'talent review',
        'talent management', 'talent development', 'learning and development',
        'l&d', 'training', 'facilitation', 'workshop', 'e-learning', 'lms',
        'compensation', 'total rewards', 'salary', 'bonus', 'commission',
        'equity', 'stock options', 'benefits', 'health insurance', 'retirement',
        '401k', 'pension', 'wellness', 'wellbeing', 'eap', 'employee assistance',
        'diversity and inclusion', 'd&i', 'dei', 'belonging', 'equity',
        'affirmative action', 'eeo', 'equal opportunity', 'harassment prevention',
        'workplace safety', 'osha', 'ergonomics', 'employee handbook', 'policy',
        'procedure', 'compliance', 'labor law', 'employment law', 'wage and hour',
        'flsa', 'fmla', 'ada', 'adaaa', 'pregnancy disability', 'pdl', 'cfra'
    ],
    'Customer Service': [
        'customer service', 'customer support', 'technical support', 'help desk',
        'service desk', 'it support', 'desktop support', 'end user support',
        'customer care', 'client services', 'account support', 'customer success',
        'customer experience', 'cx', 'client experience', 'customer satisfaction',
        'csat', 'net promoter score', 'nps', 'customer effort score', 'ces',
        'first response time', 'frt', 'average handle time', 'aht', 'resolution time',
        'first contact resolution', 'fcr', 'service level agreement', 'sla',
        'call center', 'contact center', 'service center', 'support center',
        'phone support', 'voice support', 'email support', 'chat support',
        'live chat', 'messaging', 'social media support', 'forum support',
        'knowledge base', 'kb', 'faq', 'self-service', 'portal', 'ticketing system',
        'zendesk', 'freshdesk', 'helpscout', 'intercom', 'drift', 'crisp',
        'olark', 'liveperson', 'salesforce service cloud', 'servicenow',
        'jira service management', 'jira service desk', 'bug tracking',
        'issue tracking', 'incident management', 'problem management',
        'request management', 'change management', 'escalation management',
        'complaint handling', 'complaint resolution', 'de-escalation',
        'active listening', 'empathy', 'patience', 'conflict resolution',
        'problem solving', 'troubleshooting', 'root cause analysis', 'rca',
        'customer advocacy', 'voice of customer', 'voc', 'customer feedback',
        'survey', 'interview', 'focus group', 'usability testing', 'ux research'
    ],
    'Design': [
        'design', 'graphic design', 'visual design', 'communication design',
        'brand design', 'brand identity', 'logo design', 'typography',
        'color theory', 'layout', 'composition', 'grid', 'hierarchy',
        'balance', 'contrast', 'proximity', 'repetition', 'alignment',
        'white space', 'negative space', 'ui design', 'user interface',
        'ux design', 'user experience', 'interaction design', 'ixd',
        'information architecture', 'ia', 'wireframing', 'prototyping',
        'mockup', 'storyboard', 'user flow', 'journey map', 'persona',
        'scenario', 'use case', 'user research', 'usability testing',
        'a/b testing', 'heat map', 'eye tracking', 'accessibility', 'a11y',
        'inclusive design', 'universal design', 'responsive design',
        'mobile design', 'web design', 'app design', 'product design',
        'service design', 'experience design', 'human-centered design', 'hcd',
        'design thinking', 'double diamond', 'design sprint', 'workshop',
        'co-creation', 'brainstorming', 'ideation', 'concept development',
        'iteration', 'feedback', 'critique', 'design system', 'design language',
        'component library', 'pattern library', 'style guide', 'brand guidelines',
        'figma', 'sketch', 'adobe xd', 'invision', 'framer', 'zeplin', 'abstract',
        'photoshop', 'illustrator', 'indesign', 'after effects', 'premiere pro',
        'final cut pro', 'motion design', 'animation', '3d design', 'blender',
        'cinema 4d', 'maya', '3ds max', 'zbrush', 'substance painter', 'keyshot',
        'canva', 'procreate', 'affinity', 'coreldraw', 'gimp', 'inkscape'
    ],
    'Content Creation & Writing': [
        'content creation', 'content writing', 'copywriting', 'technical writing',
        'creative writing', 'blogging', 'article writing', 'ghostwriting', 'scriptwriting',
        'screenwriting', 'playwriting', 'poetry', 'fiction writing', 'non-fiction writing',
        'academic writing', 'research writing', 'grant writing', 'proposal writing',
        'business writing', 'report writing', 'white paper writing', 'case study writing',
        'ebook writing', 'newsletter writing', 'email copywriting', 'landing page copy',
        'website copy', 'seo writing', 'seo copywriting', 'content strategy',
        'content marketing', 'content management', 'editorial', 'editing', 'proofreading',
        'copy editing', 'line editing', 'developmental editing', 'substantive editing',
        'fact-checking', 'research', 'interviewing', 'storytelling', 'narrative',
        'brand storytelling', 'brand voice', 'tone of voice', 'content calendar',
        'editorial calendar', 'content planning', 'content distribution',
        'content promotion', 'content optimization', 'content auditing',
        'content gap analysis', 'keyword research', 'topic clustering', 'pillar pages',
        'cornerstone content', 'evergreen content', 'thought leadership',
        'byline articles', 'guest posting', 'contributor', 'columnist',
        'journalism', 'news writing', 'feature writing', 'investigative journalism',
        'citizen journalism', 'multimedia journalism', 'broadcast journalism',
        'print journalism', 'digital journalism', 'magazine writing', 'newspaper writing',
        'press releases', 'media kits', 'media relations', 'public relations', 'pr',
        'crisis communication', 'internal communications', 'corporate communications',
        'executive communications', 'speech writing', 'presentation writing',
        'deck writing', 'pitch deck', 'investor deck', 'sales deck',
        'marketing collateral', 'brochures', 'flyers', 'catalogs', 'newsletters',
        'annual reports', 'sustainability reports', 'esg reporting', 'csr reporting',

        // Content platforms & tools
        'wordpress', 'medium', 'substack', 'ghost', 'contentful', 'prismic',
        'strapi', 'sanity', 'buttercms', 'contentstack', 'storyblok',
        'grammarly', 'hemingway', 'prowritingaid', 'scrivener', 'ulysses',
        'ia writer', 'bear writer', 'byword', 'typora', 'obsidian', 'roam research',
        'notion', 'coda', 'airtable', 'google docs', 'microsoft word',
        'adobe indesign', 'adobe framemaker', 'madcap flare', 'paligo',
        'author-it', 'document360', 'readme', 'readthedocs', 'gitbook',

        // Content formats
        'long-form content', 'short-form content', 'micro-content', 'snackable content',
        'listicles', 'how-to guides', 'tutorials', 'walkthroughs', 'cheat sheets',
        'checklists', 'templates', 'worksheets', 'workbooks', 'quizzes',
        'surveys', 'polls', 'assessments', 'evaluations', 'scorecards',
        'infographics', 'visual content', 'data visualization', 'charts', 'graphs',
        'illustrations', 'comics', 'memes', 'gifs', 'videos', 'podcasts',
        'webinars', 'livestreams', 'courses', 'workshops', 'masterclasses'
    ],

    'Social Media Management': [
        'social media management', 'social media marketing', 'smm', 'social media strategy',
        'social media planning', 'content scheduling', 'social media calendar',
        'community management', 'social listening', 'social monitoring',
        'social media analytics', 'social media reporting', 'social media optimization',
        'smo', 'social media advertising', 'social ads', 'paid social',

        // Platforms
        'facebook', 'instagram', 'twitter', 'x', 'linkedin', 'tiktok', 'snapchat',
        'pinterest', 'reddit', 'youtube', 'twitch', 'discord', 'slack', 'telegram',
        'whatsapp', 'wechat', 'line', 'viber', 'signal', 'clubhouse', 'threads',
        'mastodon', 'bluesky', 'truth social', 'parler', 'gab', 'ello', 'tumblr',
        'flickr', 'deviantart', 'behance', 'dribbble', 'vimeo', 'dailymotion',

        // Tools
        'hootsuite', 'buffer', 'sprout social', 'later', 'planoly', 'tailwind',
        'socialbee', 'agorapulse', 'zoho social', 'sendible', 'loomly', 'coSchedule',
        'meetedgar', 'missinglettr', 'promo', 'canva', 'adobe express', 'vista create',
        'capcut', 'inshot', 'vllo', 'quik', 'splice', 'filmora', 'premiere rush',
        'metricool', 'keyhole', 'brand24', 'brandwatch', 'mention', 'talkwalker',
        'netbase', 'quid', 'synthesio', 'meltwater', 'cision', 'muck rack',

        // Content types
        'reels', 'stories', 'posts', 'tweets', 'threads', 'pins', 'shorts',
        'lives', 'streams', 'igtv', 'youtube videos', 'tiktok videos',
        'user-generated content', 'ugc', 'influencer content', 'branded content',
        'sponsored content', 'partnership content', 'collaborations',
        'giveaways', 'contests', 'challenges', 'trends', 'viral content',

        // Engagement
        'engagement rate', 'reach', 'impressions', 'followers', 'audience growth',
        'community engagement', 'comments', 'likes', 'shares', 'reposts', 'retweets',
        'saves', 'bookmarks', 'mentions', 'tags', 'hashtags', 'branded hashtags',
        'hashtag strategy', 'trending topics', 'viral trends', 'challenges',
        'influencer outreach', 'influencer relations', 'creator relations',
        'ambassador programs', 'affiliate marketing', 'creator economy'
    ],

    'Digital Marketing': [
        'digital marketing', 'online marketing', 'internet marketing', 'growth marketing',
        'performance marketing', 'demand generation', 'lead generation', 'conversion optimization',
        'cro', 'a/b testing', 'split testing', 'multivariate testing', 'personalization',
        'marketing automation', 'email marketing', 'sms marketing', 'push notifications',
        'marketing funnel', 'sales funnel', 'customer journey', 'buyer journey',
        'touchpoints', 'attribution', 'multi-touch attribution', 'last-click attribution',
        'first-click attribution', 'linear attribution', 'time decay attribution',

        // SEO
        'seo', 'search engine optimization', 'sem', 'search engine marketing',
        'local seo', 'international seo', 'ecommerce seo', 'technical seo',
        'on-page seo', 'off-page seo', 'link building', 'backlinks', 'domain authority',
        'page authority', 'search intent', 'keyword mapping', 'keyword clustering',
        'topic clusters', 'semantic seo', 'entity seo', 'e-a-t', 'y-myl',
        'google algorithms', 'panda', 'penguin', 'hummingbird', 'rankbrain', 'bert',
        'mum', 'helpful content update', 'core web vitals', 'pagespeed', 'lcp', 'fid', 'cls',
        'mobile-first indexing', 'mobile optimization', 'voice search optimization',
        'featured snippets', 'position zero', 'rich snippets', 'schema markup',
        'structured data', 'json-ld', 'microdata', 'sitemaps', 'robots.txt',
        'canonical tags', 'redirects', '301', '302', 'htaccess', 'meta tags',
        'title tags', 'meta descriptions', 'header tags', 'h1', 'h2', 'h3',
        'alt text', 'image optimization', 'video seo', 'youtube seo',

        // Tools
        'google analytics', 'ga4', 'universal analytics', 'google tag manager',
        'gtm', 'google search console', 'google data studio', 'looker studio',
        'google ads', 'google adwords', 'google shopping', 'google merchant center',
        'google my business', 'google business profile', 'google maps',
        'bing webmaster tools', 'yandex metrica', 'baidu analytics',
        'semrush', 'ahrefs', 'moz', 'majestic', 'spyfu', 'serpstat', 'mangools',
        'kWFinder', 'keywordtool.io', 'answerthepublic', 'alsoasked', 'surfer seo',
        'frase.io', 'marketmuse', 'clearscope', 'seobility', 'screaming frog',
        'deepcrawl', 'sitebulb', 'onpage', 'seoptimer', 'woorank',
        'hotjar', 'crazy egg', 'lucky orange', 'fullstory', 'smartlook',
        'optimizely', 'vwo', 'convert', 'google optimize', 'adobe target',

        // Advertising platforms
        'facebook ads', 'meta ads', 'instagram ads', 'messenger ads',
        'linkedin ads', 'twitter ads', 'x ads', 'pinterest ads', 'snapchat ads',
        'tiktok ads', 'youtube ads', 'google display network', 'gdn',
        'google search ads', 'google shopping ads', 'google video ads',
        'youtube trueview', 'youtube bumper ads', 'discovery ads', 'gmail ads',
        'retargeting', 'remarketing', 'dynamic retargeting', 'lookalike audiences',
        'custom audiences', 'similar audiences', 'in-market audiences',
        'affinity audiences', 'demographic targeting', 'geotargeting',
        'dayparting', 'frequency capping', 'budget management', 'bid management',
        'cpc', 'cpm', 'cpa', 'roas', 'ctr', 'conversion rate', 'impressions',
        'clicks', 'cost per click', 'cost per mille', 'cost per acquisition',
        'return on ad spend', 'quality score', 'ad rank', 'ad relevance',
        'landing page experience', 'ad extensions', 'sitelinks', 'callouts',
        'structured snippets', 'call extensions', 'location extensions',
        'price extensions', 'promotion extensions', 'app extensions'
    ],

    'Influencer Marketing': [
        'influencer marketing', 'influencer relations', 'influencer outreach',
        'influencer identification', 'influencer vetting', 'influencer verification',
        'influencer management', 'influencer campaigns', 'influencer partnerships',
        'brand collaborations', 'sponsored content', 'paid partnerships',
        'affiliate marketing', 'ambassador programs', 'brand advocacy',
        'creator economy', 'content creators', 'macro-influencers', 'micro-influencers',
        'nano-influencers', 'mega-influencers', 'celebrities', 'thought leaders',
        'key opinion leaders', 'kols', 'key opinion consumers', 'kocs',
        'influencer tiers', 'influencer categories', 'niche influencers',
        'industry experts', 'subject matter experts', 'smes',
        'ugc creators', 'user-generated content', 'community creators',
        'twitch streamers', 'youtubers', 'tiktokers', 'instagrammers',
        'bloggers', 'vloggers', 'podcasters', 'discord moderators',
        'reddit moderators', 'facebook group admins', 'linkedin influencers',

        // Campaign types
        'product seeding', 'gifting campaigns', 'product reviews', 'unboxings',
        'tutorials', 'demonstrations', 'how-to videos', 'day in the life',
        'behind the scenes', 'bts', 'takeovers', 'instagram takeovers',
        'tiktok takeovers', 'challenges', 'hashtag challenges', 'giveaways',
        'contests', 'sweepstakes', 'affiliate links', 'discount codes',
        'promo codes', 'tracking links', 'utm parameters', 'campaign tracking',
        'ambassador codes', 'referral programs', 'loyalty programs',

        // Management & tools
        'influencer contracts', 'influencer agreements', 'briefs', 'creative briefs',
        'content guidelines', 'brand guidelines', 'disclosure', 'sponsored tags',
        'ad disclosure', 'ftc compliance', 'fda compliance', 'legal compliance',
        'negotiation', 'rate cards', 'influencer rates', 'payment terms',
        'influencer platforms', 'aspireiq', 'grin', 'traackr', 'upfluence',
        'klear', 'creators', 'buzzsumo', 'brandbassador', 'insense',
        'obvious.ly', 'influence.co', 'creatorkit', 'impact', 'partnerize',
        'rewardstyle', 'liketoknowit', 'ltk', 'shopstyle', 'collective voice',

        // Measurement
        'engagement rate', 'er', 'earned media value', 'emv', 'influencer roi',
        'campaign performance', 'reach', 'impressions', 'views', 'likes',
        'comments', 'shares', 'saves', 'click-through rate', 'ctr',
        'conversion rate', 'sales lift', 'brand lift', 'awareness lift',
        'consideration lift', 'purchase intent', 'sentiment analysis',
        'brand mentions', 'social listening', 'share of voice', 'sov',
        'brand health metrics', 'brand affinity', 'brand love'
    ],

    'Video Production & Editing': [
        'video production', 'video editing', 'video post-production', 'video pre-production',
        'film production', 'film editing', 'movie editing', 'television production',
        'broadcast production', 'commercial production', 'music video production',
        'corporate video production', 'explainer videos', 'product videos',
        'demo videos', 'tutorial videos', 'training videos', 'educational videos',
        'marketing videos', 'promotional videos', 'advertisements', 'tv commercials',
        'social media videos', 'youtube videos', 'tiktok videos', 'instagram reels',
        'facebook videos', 'linkedin videos', 'snapchat videos', 'vertical videos',
        'horizontal videos', 'square videos', 'live streaming', 'webinars',
        'virtual events', 'hybrid events', 'event coverage', 'documentaries',
        'short films', 'feature films', 'series', 'web series', 'miniseries',
        'animation', '2d animation', '3d animation', 'motion graphics', 'vfx',
        'visual effects', 'cgi', 'computer generated imagery', 'sfx', 'special effects',
        'green screen', 'chroma key', 'rotoscoping', 'masking', 'tracking',
        'motion tracking', 'camera tracking', 'match moving', 'compositing',
        'color grading', 'color correction', 'audio editing', 'sound design',
        'sound mixing', 'audio mixing', 'voice over', 'narration', 'dialogue editing',
        'music editing', 'sound effects', 'foley', 'audio restoration', 'noise reduction',

        // Software & Tools
        'adobe premiere pro', 'premiere pro', 'final cut pro', 'fcp', 'fcp x',
        'davinci resolve', 'resolve', 'avid media composer', 'avid', 'vegas pro',
        'sony vegas', 'magix', 'lightworks', 'hitfilm', 'shotcut', 'openshot',
        'kdenlive', 'imovie', 'capcut', 'inshot', 'vllo', 'quik', 'filmora',
        'wondershare filmora', 'pinnacle studio', 'cyberlink powerdirector',
        'corel videostudio', 'adobe after effects', 'after effects', 'ae',
        'cinema 4d', 'c4d', 'blender', 'maya', '3ds max', 'modo', 'houdini',
        'nuke', 'fusion', 'flame', 'smoke', 'motion', 'apple motion',
        'audacity', 'adobe audition', 'audition', 'logic pro', 'pro tools',
        'ableton live', 'fl studio', 'garageband', 'cubase', 'reason',

        // Equipment
        'camera operation', 'cinematography', 'videography', 'photography',
        'dslr', 'mirrorless', 'cinema cameras', 'red', 'arri', 'blackmagic',
        'sony', 'canon', 'nikon', 'panasonic', 'fujifilm', 'gopro', 'dji',
        'drones', 'aerial videography', 'gimbal', 'stabilizer', 'tripod',
        'lighting', 'studio lighting', 'natural lighting', 'three-point lighting',
        'sound recording', 'microphones', 'lavalier', 'shotgun mic', 'boom mic',
        'audio recorder', 'zoom recorder', 'tascam', 'mixer', 'audio interface',
        'monitors', 'reference monitors', 'studio monitors', 'headphones',

        // Production roles
        'director', 'producer', 'executive producer', 'line producer', 'production manager',
        'production coordinator', 'production assistant', 'pa', 'camera operator',
        'director of photography', 'dp', 'cinematographer', 'gaffer', 'key grip',
        'best boy', 'lighting technician', 'sound engineer', 'boom operator',
        'makeup artist', 'hair stylist', 'costume designer', 'wardrobe stylist',
        'set designer', 'art director', 'production designer', 'location scout',
        'location manager', 'casting director', 'casting agent', 'talent',
        'actor', 'actress', 'voice actor', 'narrator', 'host', 'presenter'
    ],

    'Photography': [
        'photography', 'photographer', 'portrait photography', 'wedding photography',
        'event photography', 'corporate photography', 'headshot photography',
        'fashion photography', 'product photography', 'commercial photography',
        'food photography', 'real estate photography', 'architectural photography',
        'interior photography', 'landscape photography', 'nature photography',
        'wildlife photography', 'travel photography', 'street photography',
        'documentary photography', 'photojournalism', 'sports photography',
        'action photography', 'fine art photography', 'abstract photography',
        'macro photography', 'microscopy', 'astrophotography', 'night photography',
        'long exposure', 'hdr photography', 'high dynamic range', 'panorama',
        '360 photography', 'virtual tours', 'drone photography', 'aerial photography',
        'underwater photography', 'studio photography', 'location photography',
        'on-location photography', 'candid photography', 'posed photography',
        'lifestyle photography', 'editorial photography', 'advertising photography',

        // Techniques
        'composition', 'rule of thirds', 'golden ratio', 'leading lines',
        'framing', 'symmetry', 'patterns', 'texture', 'depth of field',
        'shallow dof', 'deep dof', 'bokeh', 'exposure', 'exposure triangle',
        'aperture', 'f-stop', 'shutter speed', 'iso', 'white balance',
        'color temperature', 'color grading', 'color correction', 'retouching',
        'photo editing', 'post-processing', 'raw processing', 'batch processing',
        'culling', 'selection', 'tagging', 'keywording', 'metadata', 'exif',
        'lighting techniques', 'natural light', 'artificial light', 'strobes',
        'continuous lighting', 'flash', 'speedlight', 'softbox', 'umbrella',
        'beauty dish', 'reflector', 'diffuser', 'gobo', 'flag', 'snoot',
        'gels', 'color gels', 'cto', 'ctb', 'nd filters', 'polarizing filter',
        'uv filter', 'graduated filter', 'lens filters',

        // Equipment & Software
        'canon eos', 'nikon dslr', 'sony alpha', 'fujifilm x', 'pentax',
        'leica', 'hasselblad', 'phase one', 'medium format', 'large format',
        'lenses', 'prime lens', 'zoom lens', 'wide angle', 'ultra-wide',
        'standard lens', 'telephoto', 'super-telephoto', 'macro lens',
        'tilt-shift', 'fisheye', 'portrait lens', 'landscape lens',
        'tripod', 'monopod', 'camera strap', 'camera bag', 'memory card',
        'external hard drive', 'backup', 'cloud storage',
        'adobe photoshop', 'photoshop', 'lightroom', 'adobe lightroom',
        'capture one', 'phase one capture one', 'dxo photolab', 'on1 photo',
        'affinity photo', 'luminar', 'skylum', 'corel paintshop pro',
        'gimp', 'darktable', 'rawtherapee', 'photomechanic', 'bridge',
        'camera raw', 'nik collection', 'alien skin', 'topaz labs',
        'portraitpro', 'skylum', 'fractals', 'gigapixel',

        // Business
        'photography business', 'client management', 'client consultations',
        'contracts', 'model releases', 'property releases', 'licensing',
        'usage rights', 'copyright', 'intellectual property', 'watermarking',
        'printing', 'fine art prints', 'canvas prints', 'metal prints',
        'albums', 'photo books', 'wall art', 'gallery shows', 'exhibitions',
        'portfolio', 'portfolio review', 'website', 'social media for photographers',
        'instagram for photographers', '500px', 'flickr', 'behance',
        'photo contests', 'awards', 'publications', 'stock photography',
        'shutterstock', 'getty images', 'adobe stock', 'istock', 'alamy'
    ],

    'Graphic Design & Visual Arts': [
        'graphic design', 'visual design', 'communication design', 'brand design',
        'brand identity', 'logo design', 'branding', 'rebranding', 'visual identity',
        'corporate identity', 'stationery design', 'business card design',
        'letterhead design', 'envelope design', 'brochure design', 'flyer design',
        'poster design', 'banner design', 'billboard design', 'signage design',
        'environmental graphics', 'wayfinding', 'exhibit design', 'trade show design',
        'retail design', 'point of sale', 'pos', 'packaging design', 'label design',
        'product packaging', 'sustainable packaging', 'eco packaging',
        'print design', 'editorial design', 'magazine design', 'book design',
        'book cover design', 'album cover design', 'cd cover', 'dvd cover',
        'typography', 'type design', 'font design', 'lettering', 'hand lettering',
        'calligraphy', 'sign painting', 'illustration', 'digital illustration',
        'vector illustration', 'raster illustration', 'childrens illustration',
        'scientific illustration', 'medical illustration', 'technical illustration',
        'fashion illustration', 'concept art', 'character design', 'storyboarding',
        'infographic design', 'data visualization', 'chart design', 'map design',
        'ui design', 'user interface', 'ux design', 'user experience',
        'web design', 'app design', 'mobile design', 'responsive design',
        'interaction design', 'ixd', 'motion design', 'motion graphics',
        'animation', '2d animation', '3d animation', 'explainer videos',
        'title sequence', 'opening credits', 'commercial animation',

        // Software & Tools
        'adobe creative cloud', 'adobe creative suite', 'photoshop', 'illustrator',
        'indesign', 'adobe indesign', 'xd', 'adobe xd', 'figma', 'sketch',
        'affinity designer', 'affinity photo', 'affinity publisher', 'coreldraw',
        'corel painter', 'procreate', 'clip studio paint', 'medibang',
        'krita', 'gimp', 'inkscape', 'gravit designer', 'vectr', 'canva',
        'adobe express', 'vista create', 'crello', 'stencil', 'piktochart',
        'venngage', 'easel.ly', 'blender', 'cinema 4d', 'c4d', '3ds max',
        'maya', 'zbrush', 'substance painter', 'substance designer', 'marvelous designer',
        'keyshot', 'v-ray', 'arnold', 'renderman', 'octane', 'redshift',
        'after effects', 'premiere pro', 'final cut pro', 'davinci resolve',

        // Techniques & Principles
        'color theory', 'color palette', 'color scheme', 'color harmony',
        'complementary colors', 'analogous colors', 'triadic colors',
        'monochromatic', 'achromatic', 'color psychology', 'visual hierarchy',
        'balance', 'symmetry', 'asymmetry', 'contrast', 'emphasis', 'rhythm',
        'pattern', 'movement', 'unity', 'variety', 'proportion', 'scale',
        'grid systems', 'modular grid', 'manuscript grid', 'column grid',
        'baseline grid', 'golden ratio', 'fibonacci sequence', 'rule of thirds',
        'white space', 'negative space', 'positive space', 'figure-ground',
        'gestalt principles', 'similarity', 'proximity', 'closure', 'continuation',
        'common fate', 'good figure', 'prägnanz', 'symmetry principle',

        // Print & Production
        'prepress', 'print production', 'offset printing', 'digital printing',
        'screen printing', 'letterpress', 'embossing', 'debossing', 'foil stamping',
        'die cutting', 'spot uv', 'lamination', 'binding', 'perfect binding',
        'saddle stitch', 'spiral binding', 'case binding', 'hardcover', 'softcover',
        'paper stock', 'paper weight', 'coated paper', 'uncoated paper',
        'matte finish', 'gloss finish', 'satin finish', 'texture', 'embossing',
        'paper sizes', 'a4', 'a5', 'letter', 'legal', 'tabloid', 'executive',
        'cmyk', 'rgb', 'pantone', 'spot colors', 'process colors', 'color separation',
        'bleed', 'trim', 'safe zone', 'resolution', 'dpi', 'ppi', 'vector', 'raster',
        'eps', 'ai', 'pdf', 'psd', 'tiff', 'jpeg', 'png', 'svg', 'gif', 'webp'
    ],

    'UI/UX Design': [
        'ui design', 'user interface design', 'ux design', 'user experience design',
        'product design', 'digital product design', 'interaction design', 'ixd',
        'service design', 'experience design', 'human-centered design', 'hcd',
        'design thinking', 'design sprint', 'double diamond', 'lean ux',
        'agile ux', 'user research', 'ux research', 'user testing',
        'usability testing', 'guerilla testing', 'lab testing', 'remote testing',
        'a/b testing', 'multivariate testing', 'tree testing', 'card sorting',
        'first click testing', '5 second test', 'preference testing',
        'user interviews', 'contextual inquiry', 'ethnographic research',
        'field studies', 'diary studies', 'surveys', 'questionnaires',
        'focus groups', 'stakeholder interviews', 'expert review',
        'heuristic evaluation', 'cognitive walkthrough', 'accessibility audit',
        'competitive analysis', 'comparative analysis', 'market research',
        'persona creation', 'user personas', 'customer personas', 'buyer personas',
        'user scenarios', 'user journeys', 'customer journey maps', 'experience maps',
        'service blueprints', 'storyboards', 'empathy maps', 'affinity diagrams',

        // Design deliverables
        'wireframes', 'low-fidelity wireframes', 'mid-fidelity wireframes',
        'high-fidelity wireframes', 'mockups', 'prototypes', 'interactive prototypes',
        'clickable prototypes', 'paper prototypes', 'digital prototypes',
        'design systems', 'design language', 'style guides', 'pattern libraries',
        'component libraries', 'ui kits', 'icons', 'icon sets', 'illustrations',
        'micro-interactions', 'microcopy', 'ux writing', 'content strategy',
        'information architecture', 'ia', 'sitemaps', 'user flows', 'task flows',
        'flow diagrams', 'navigation design', 'menu structures', 'taxonomies',
        'metadata', 'content modeling', 'responsive design', 'adaptive design',
        'mobile-first design', 'desktop-first design', 'cross-platform design',
        'multi-device design', 'omnichannel design', 'design tokens',
        'design ops', 'design operations', 'design management',

        // Tools
        'figma', 'sketch', 'adobe xd', 'invision', 'framer', 'uxpin',
        'marvel', 'proto.io', 'principle', 'flinto', 'origami studio',
        'pixate', 'atomic', 'zeplin', 'avocode', 'supernova', 'relay',
        'abstract', 'plant', 'versions', 'kactus', 'lottie', 'haiku',
        'after effects', 'principle', 'keynote', 'powerpoint', 'maze',
        'usertesting.com', 'userzoom', 'optimal workshop', 'lookback',
        'hotjar', 'crazy egg', 'fullstory', 'smartlook', 'mixpanel',
        'amplitude', 'heap', 'google analytics', 'tableau', 'power bi',

        // Principles & Methods
        'visual hierarchy', 'typography', 'color theory', 'contrast',
        'repetition', 'alignment', 'proximity', 'balance', 'space',
        'size', 'scale', 'weight', 'emphasis', 'consistency', 'standards',
        'affordances', 'signifiers', 'feedback', 'mapping', 'constraints',
        'mental models', 'recognition over recall', 'user control', 'freedom',
        'error prevention', 'error handling', 'forgiveness', 'flexibility',
        'efficiency of use', 'aesthetic integrity', 'minimalist design',
        'fitts law', 'hick\'s law', 'jacob\'s law', 'law of proximity',
        'law of similarity', 'law of continuity', 'miller\'s law',
        'tesler\'s law', 'postel\'s law', 'pareto principle', '80/20 rule',
        'cognitive load', 'cognitive friction', 'user delight', 'emotional design',
        'persuasive design', 'behavioral design', 'gamification', 'nudge theory',

        // Accessibility
        'accessibility', 'a11y', 'wcag', 'wcag 2.0', 'wcag 2.1', 'wcag 3.0',
        'section 508', 'ada compliance', 'eaa', 'en 301 549', 'accessible design',
        'inclusive design', 'universal design', 'design for all', 'assistive technology',
        'screen readers', 'voiceover', 'nvda', 'jaws', 'talkback', 'keyboard navigation',
        'focus indicators', 'skip navigation', 'landmarks', 'aria labels',
        'alt text', 'captions', 'transcripts', 'audio descriptions', 'high contrast',
        'color contrast', 'font size', 'responsive text', 'motion sensitivity',
        'epilepsy safe', 'photosensitivity', 'vestibular disorders'
    ],

    'Project Management & Agile': [
        'project management', 'program management', 'portfolio management',
        'project planning', 'project scheduling', 'project tracking', 'project control',
        'project governance', 'project oversight', 'project coordination',
        'project administration', 'project support', 'project office', 'pmo',
        'project management office', 'program management office', 'portfolio management office',

        // Methodologies
        'agile', 'scrum', 'kanban', 'lean', 'waterfall', 'hybrid', 'agile hybrid',
        'scrum ban', 'scrumban', 'safe', 'scaled agile framework', 'less',
        'large-scale scrum', 'da', 'disciplined agile', 'spotify model',
        'crystal', 'fdd', 'feature-driven development', 'xp', 'extreme programming',
        'tdd', 'test-driven development', 'bdd', 'behavior-driven development',
        'ddd', 'domain-driven design', 'devops', 'continuous delivery',

        // Scrum specific
        'scrum master', 'product owner', 'development team', 'scrum team',
        'scrum of scrums', 'sprint', 'iteration', 'sprint planning',
        'daily standup', 'daily scrum', 'sprint review', 'sprint retrospective',
        'sprint demo', 'sprint goal', 'sprint backlog', 'product backlog',
        'backlog grooming', 'backlog refinement', 'user stories', 'epics',
        'themes', 'initiatives', 'story points', 'estimation', 'planning poker',
        'affinity estimation', 'bucket system', 't-shirt sizing', 'velocity',
        'capacity planning', 'burndown chart', 'burnup chart', 'cumulative flow',
        'cfd', 'task board', 'kanban board', 'scrum board', 'information radiator',

        // Kanban specific
        'kanban', 'kanban board', 'wip limits', 'work in progress limits',
        'pull system', 'push system', 'flow', 'throughput', 'cycle time',
        'lead time', 'takt time', 'process time', 'wait time', 'queue time',
        'blocked', 'blockers', 'impediments', 'bottlenecks', 'value stream',
        'value stream mapping', 'vsm', 'kanban cadences', 'replenishment meeting',
        'delivery meeting', 'service delivery review', 'risk review',
        'operations review', 'strategy review',

        // Traditional PM
        'project charter', 'project scope', 'scope statement', 'scope creep',
        'change control', 'change management', 'configuration management',
        'requirements gathering', 'requirements analysis', 'stakeholder analysis',
        'stakeholder management', 'communication management', 'risk management',
        'risk assessment', 'risk mitigation', 'issue management', 'issue tracking',
        'dependencies', 'critical path', 'critical chain', 'float', 'slack',
        'milestones', 'deliverables', 'work breakdown structure', 'wbs',
        'pert', 'network diagram', 'gantt chart', 'timeline', 'schedule',
        'baseline', 'actuals', 'earned value management', 'evm', 'spi', 'cpi',
        'budget management', 'cost control', 'resource management', 'resource allocation',
        'resource leveling', 'capacity planning', 'workload management',

        // Tools
        'jira', 'confluence', 'trello', 'asana', 'monday.com', 'airtable',
        'smartsheet', 'wrike', 'teamwork', 'basecamp', 'clickup', 'notion',
        'todoist', 'omnifocus', 'things', 'remember the milk', 'taskworld',
        'meistertask', 'paymo', 'activecollab', 'redmine', 'trac', 'bugzilla',
        'fogbugz', 'youtrack', 'jetbrains', 'microsoft project', 'project',
        'project online', 'project server', 'project desktop', 'sharepoint',
        'azure devops', 'azure boards', 'github projects', 'gitlab boards',
        'google workspace', 'google sheets', 'google docs', 'google slides',
        'microsoft teams', 'slack', 'zoom', 'webex', 'gotomeeting',

        // Certifications
        'pmp', 'pmi', 'project management professional', 'capm',
        'certified associate in project management', 'pgmp', 'program management professional',
        'pfmp', 'portfolio management professional', 'pmi-acp', 'pmi agile certified practitioner',
        'pmi-sp', 'pmi scheduling professional', 'pmi-rp', 'pmi risk management professional',
        'prince2', 'prince2 foundation', 'prince2 practitioner', 'prince2 agile',
        'scrum master', 'csm', 'certified scrum master', 'psm', 'professional scrum master',
        'psm i', 'psm ii', 'psm iii', 'scaled professional scrum', 'sps',
        'safe', 'scaled agile framework', 'safe agilist', 'safe practitioner',
        'safe advanced scrum master', 'safe product owner', 'safe po', 'safe sm',
        'safe rte', 'safe release train engineer', 'spc', 'safe program consultant',
        'kanban', 'kanban foundation', 'kanban practitioner', 'kanban management professional',
        'kmp', 'kanban coaching professional', 'kcp', 'akt', 'kanban trainer',
        'lean six sigma', 'green belt', 'black belt', 'master black belt',
        'yellow belt', 'white belt', 'dmaic', 'dmadv', 'kaizen', 'kaizen leader',
        'itil', 'itil foundation', 'itil practitioner', 'itil intermediate',
        'itil expert', 'itil master', 'itil 4', 'msp', 'managing successful programmes',
        'mop', 'management of portfolios', 'p3o', 'portfolio, programme and project offices',
        'p3m3', 'portfolio, programme and project management maturity model',
        'cmmi', 'capability maturity model integration', 'iso 21500', 'iso 9001'
    ],

    'Product Management': [
        'product management', 'product owner', 'product manager', 'pm',
        'product leadership', 'product strategy', 'product vision', 'product roadmap',
        'product planning', 'product development', 'product lifecycle', 'plc',
        'product lifecycle management', 'product innovation', 'product launch',
        'go-to-market strategy', 'gtm', 'product-market fit', 'pmf',
        'product discovery', 'product delivery', 'product operations', 'product ops',
        'technical product management', 'data product management', 'ai product management',
        'saas product management', 'b2b product management', 'b2c product management',
        'enterprise product management', 'consumer product management', 'platform product',
        'internal product', 'external product', 'api product', 'mobile product',
        'web product', 'hardware product', 'software product', 'physical product',
        'digital product', 'hybrid product',

        // Product methods
        'product discovery', 'user research', 'customer interviews', 'user testing',
        'market research', 'competitive analysis', 'product analytics', 'data analysis',
        'a/b testing', 'split testing', 'multivariate testing', 'feature flags',
        'feature toggles', 'gradual rollout', 'canary release', 'blue-green deployment',
        'mvp', 'minimum viable product', 'mmf', 'minimum marketable feature',
        'mlp', 'minimum lovable product', 'map', 'minimum awesome product',
        'product backlog', 'backlog grooming', 'prioritization', 'rice scoring',
        'rice', 'reach impact confidence effort', 'weighted scoring', 'wsjf',
        'weighted shortest job first', 'kano model', 'moaw', 'must have should have could have wont',
        'story mapping', 'user story mapping', 'opportunity canvas', 'lean canvas',
        'business model canvas', 'value proposition canvas', 'product canvas',

        // Product metrics
        'product metrics', 'success metrics', 'kpis', 'key performance indicators',
        'okrs', 'objectives and key results', 'nps', 'net promoter score',
        'customer satisfaction', 'csat', 'customer effort score', 'ces',
        'retention', 'churn', 'churn rate', 'customer churn', 'revenue churn',
        'arr', 'annual recurring revenue', 'mrr', 'monthly recurring revenue',
        'arpu', 'average revenue per user', 'arpau', 'average revenue per active user',
        'ltv', 'customer lifetime value', 'cac', 'customer acquisition cost',
        'payback period', 'cac payback', 'magic number', 'quick ratio',
        'active users', 'dau', 'daily active users', 'wau', 'weekly active users',
        'mau', 'monthly active users', 'stickiness', 'dau/mau', 'engagement',
        'adoption', 'feature adoption', 'activation', 'conversion', 'funnel',
        'funnel conversion', 'drop-off', 'abandonment', 'completion rate',
        'task success', 'time on task', 'time to complete', 'error rate',
        'quality metrics', 'defect rate', 'bug rate', 'crash rate', 'uptime',
        'availability', 'reliability', 'performance', 'latency', 'response time',

        // Tools
        'productboard', 'airfocus', 'aha!', 'prodpad', 'craft.io', 'productplan',
        'roadmunk', 'jira', 'confluence', 'trello', 'asana', 'monday.com',
        'airtable', 'notion', 'coda', 'miro', 'mural', 'whimsical', 'lucidchart',
        'figma', 'sketch', 'adobe xd', 'balsamiq', 'marvel', 'invision',
        'user testing', 'usertesting.com', 'userzoom', 'optimal workshop',
        'lookback', 'hotjar', 'fullstory', 'amplitude', 'mixpanel', 'heap',
        'google analytics', 'tableau', 'power bi', 'mode analytics', 'looker',
        'superset', 'metabase', 'redash', 'datadog', 'new relic', 'sentry',
        'pendo', 'appcues', 'walkme', 'whatfix', 'chameleon', 'userpilot',

        // Product roles
        'associate product manager', 'apm', 'product manager', 'pm',
        'senior product manager', 'lead product manager', 'principal product manager',
        'director of product', 'vp of product', 'chief product officer', 'cpo',
        'head of product', 'group product manager', 'product lead', 'product owner',
        'technical product manager', 'data product manager', 'platform product manager',
        'api product manager', 'mobile product manager', 'web product manager',
        'growth product manager', 'core product manager', 'new product manager',
        'product marketing manager', 'pmm', 'product marketing', 'product evangelist',
        'product advocate', 'product champion', 'product consultant'
    ],

    'Business Analysis': [
        'business analysis', 'business analyst', 'ba', 'senior business analyst',
        'lead business analyst', 'principal business analyst', 'business architecture',
        'business process', 'process improvement', 'process optimization', 'process reengineering',
        'business process management', 'bpm', 'business process modeling', 'bpmn',
        'business process modeling notation', 'process mapping', 'flowcharting',
        'swimlane diagrams', 'value stream mapping', 'vsm', 'business rules',
        'business requirements', 'functional requirements', 'non-functional requirements',
        'technical requirements', 'user requirements', 'stakeholder requirements',
        'requirements gathering', 'requirements elicitation', 'requirements analysis',
        'requirements specification', 'requirements management', 'requirements traceability',
        'requirements validation', 'requirements verification', 'requirements prioritization',
        'use cases', 'user stories', 'epics', 'features', 'functional specifications',
        'brd', 'business requirements document', 'frd', 'functional requirements document',
        'trd', 'technical requirements document', 'srs', 'software requirements specification',
        'user manuals', 'training materials', 'user guides', 'release notes',

        // Techniques
        'interviews', 'workshops', 'facilitation', 'focus groups', 'surveys',
        'questionnaires', 'observation', 'job shadowing', 'document analysis',
        'interface analysis', 'prototyping', 'wireframing', 'mockups',
        'brainstorming', 'mind mapping', 'root cause analysis', 'rca',
        'fishbone diagram', 'ishikawa diagram', 'cause and effect analysis',
        'five whys', '5 whys', 'pareto analysis', '80/20 rule',
        'swot analysis', 'strengths weaknesses opportunities threats',
        'pestle analysis', 'political economic social technological legal environmental',
        'porter\'s five forces', 'competitive analysis', 'market analysis',
        'gap analysis', 'current state assessment', 'future state assessment',
        'to-be analysis', 'as-is analysis', 'impact analysis', 'feasibility study',
        'cost-benefit analysis', 'cba', 'roi analysis', 'business case',
        'business case development', 'business justification',

        // Data analysis
        'data analysis', 'data modeling', 'conceptual data model', 'logical data model',
        'physical data model', 'erd', 'entity relationship diagram', 'class diagrams',
        'data flow diagrams', 'dfd', 'data dictionary', 'metadata', 'data lineage',
        'data mapping', 'data transformation', 'data quality', 'data governance',
        'master data management', 'mdm', 'reporting', 'dashboarding',
        'sql', 'queries', 'query writing', 'excel', 'advanced excel',
        'vba', 'macros', 'pivot tables', 'vlookup', 'index match', 'power query',
        'power pivot', 'power bi', 'tableau', 'qlikview', 'qliksense',
        'spotfire', 'sap business objects', 'cognos', 'microstrategy',

        // Methodologies & Frameworks
        'agile', 'scrum', 'kanban', 'waterfall', 'hybrid', 'babiok',
        'business analysis body of knowledge', 'iiba', 'international institute of business analysis',
        'pmba', 'project management body of knowledge', 'babok', 'cbap',
        'certified business analysis professional', 'ccba', 'certification of competency in business analysis',
        'ecba', 'entry certificate in business analysis', 'aac', 'agile analysis certification',
        'pba', 'pmi professional in business analysis', 'pmi-pba',
        'cobit', 'control objectives for information and related technologies',
        'togaf', 'the open group architecture framework', 'archimate',
        'zachman framework', 'uml', 'unified modeling language', 'sysml',

        // Tools
        'jira', 'confluence', 'trello', 'asana', 'monday.com', 'airtable',
        'notion', 'coda', 'miro', 'mural', 'whimsical', 'lucidchart',
        'visio', 'microsoft visio', 'draw.io', 'diagrams.net', 'gliffy',
        'enterprise architect', 'sparx', 'magicdraw', 'rational rose',
        'rational software architect', 'ibm rational', 'cameo', 'modelio',
        'bizagi', 'signavio', 'aris', 'appian', 'pega', 'bonitasoft',
        'camunda', 'flowable', 'activiti', 'k2', 'nintex', 'kissflow',
        'blueworks live', 'ibm blueworks', 'processmaker', 'process street',

        // Documentation
        'documentation', 'technical writing', 'business writing', 'report writing',
        'presentation skills', 'stakeholder presentations', 'slide decks',
        'powerpoint', 'google slides', 'keynote', 'sharepoint', 'wikis',
        'knowledge management', 'km', 'knowledge base', 'kb', 'confluence',
        'notion', 'slite', 'slab', 'guru', 'shelf', 'document360', 'gitbook',
        'readthedocs', 'readme', 'mkdocs', 'sphinx', 'apidoc', 'swagger',
        'openapi', 'raml', 'postman', 'insomnia', 'stoplight', 'redoc'
    ],

    'Sales & Business Development': [
        'sales', 'business development', 'bd', 'biz dev', 'account executive',
        'ae', 'sales representative', 'sales rep', 'salesperson', 'salesman',
        'saleswoman', 'sales associate', 'sdr', 'sales development representative',
        'bdr', 'business development representative', 'lead generation', 'lead gen',
        'prospecting', 'cold calling', 'warm calling', 'cold emailing', 'cold outreach',
        'outbound sales', 'inbound sales', 'inside sales', 'outside sales',
        'field sales', 'territory sales', 'regional sales', 'global sales',
        'key account management', 'strategic account management', 'enterprise sales',
        'mid-market sales', 'sme sales', 'small business sales', 'startup sales',
        'saas sales', 'software sales', 'technology sales', 'it sales',
        'cloud sales', 'professional services sales', 'consulting sales',
        'hardware sales', 'equipment sales', 'industrial sales', 'manufacturing sales',
        'pharmaceutical sales', 'medical sales', 'healthcare sales', 'biotech sales',

        // Sales process
        'sales cycle', 'sales process', 'sales pipeline', 'sales funnel',
        'lead qualification', 'qualifying leads', 'bant', 'budget authority need timeline',
        'champ', 'challenges authority money prioritization', 'meddic',
        'metrics economic buyer decision criteria decision process identify pain champion',
        'spin selling', 'situation problem implication need-payoff', 'challenger sale',
        'solution selling', 'conceptual selling', 'strategic selling', 'consultative selling',
        'value selling', 'relationship selling', 'transactional selling',
        'discovery calls', 'discovery meetings', 'needs analysis', 'requirements gathering',
        'demos', 'product demos', 'presentations', 'proposals', 'quotes',
        'estimates', 'negotiation', 'closing', 'contracts', 'agreements',
        'sla', 'service level agreement', 'msa', 'master service agreement',
        'sow', 'statement of work', 'renewals', 'upsells', 'cross-sells',
        'expansion', 'account growth', 'customer success', 'retention',

        // Sales metrics
        'sales metrics', 'kpis', 'quotas', 'sales quota', 'attainment',
        'achievement', 'target', 'goal', 'forecast', 'pipeline coverage',
        'win rate', 'close rate', 'conversion rate', 'lead to opportunity',
        'opportunity to close', 'sales cycle length', 'average deal size',
        'average contract value', 'acv', 'total contract value', 'tcv',
        'annual recurring revenue', 'arr', 'monthly recurring revenue', 'mrr',
        'new logo', 'new customer acquisition', 'expansion revenue',
        'upsell revenue', 'cross-sell revenue', 'renewal rate', 'churn',
        'customer churn', 'revenue churn', 'gross retention', 'net retention',
        'logo retention', 'net dollar retention', 'ndr', 'gdr',

        // Tools & technologies
        'crm', 'salesforce', 'hubspot', 'pipedrive', 'zoho crm', 'freshsales',
        'microsoft dynamics', 'dynamics 365', 'oracle crm', 'sap crm',
        'sugar crm', 'suitecrm', 'vtiger', 'insightly', 'nimble', 'bigin',
        'salesloft', 'outreach', 'yesware', 'reply.io', 'mixmax', 'clearbit',
        'linkedin sales navigator', 'sales navigator', 'zoominfo', 'discoverorg',
        'lead411', 'lusha', 'hunter.io', 'voilanorbert', 'rocketreach',
        'datanyze', 'insideview', 'bombora', 'gong', 'chorus', 'execvision',
        'ringcentral', 'dialpad', 'talkdesk', 'fivetran', 'apttus', 'conga',
        'panda doc', 'proposify', 'better proposals', 'quotewerks', 'dealhub',
        'seismic', 'highspot', 'showpad', 'mindtickle', 'level jump',

        // Techniques & Methodologies
        'sandler sales', 'sandler method', 'sandler system', 'sandler selling',
        'spin', 'spin selling', 'challenger sales', 'challenger methodology',
        'solution sales', 'solution selling', 'conceptual sales', 'conceptual selling',
        'value-based selling', 'consultative selling', 'insight selling',
        'strategic selling', 'situational selling', 'adaptive selling',
        'social selling', 'account-based selling', 'abs', 'target account selling',
        'the sale', 'the psychology of selling', 'the psychology of sales',
        'influence', 'persuasion', 'robert cialdini', 'principles of persuasion',
        'reciprocity', 'scarcity', 'authority', 'consistency', 'liking', 'consensus',
        'negotiation tactics', 'win-win negotiation', 'principled negotiation',
        'harvard negotiation', 'getting to yes', 'bargaining', 'deal making',
        'closing techniques', 'assumptive close', 'alternative close',
        'summary close', 'sharp angle close', 'question close', 'scarcity close',
        'now or never close', 'take away close', 'hard close', 'soft close'
    ],

    'Customer Success': [
        'customer success', 'cs', 'customer success manager', 'csm',
        'customer success specialist', 'customer success representative',
        'customer success associate', 'customer success lead', 'customer success director',
        'head of customer success', 'vp of customer success', 'chief customer officer',
        'cco', 'account management', 'customer account management',
        'client management', 'client services', 'customer services',
        'customer support', 'customer care', 'customer relations',
        'customer relationship management', 'client relations', 'client relationships',
        'account retention', 'customer retention', 'client retention',
        'account growth', 'customer growth', 'client growth', 'account expansion',
        'customer expansion', 'client expansion', 'upsells', 'cross-sells',
        'renewals', 'contract renewals', 'subscription renewals', 'churn management',
        'churn reduction', 'customer churn', 'client churn', 'revenue churn',

        // Customer journey
        'customer journey', 'customer lifecycle', 'customer experience', 'cx',
        'client experience', 'onboarding', 'implementation', 'training',
        'adoption', 'product adoption', 'feature adoption', 'user adoption',
        'engagement', 'user engagement', 'customer engagement', 'health score',
        'customer health', 'customer health score', 'customer 360', 'customer view',
        'customer profile', 'customer segmentation', 'customer personas',
        'customer mapping', 'touchpoints', 'customer interactions',
        'communication channels', 'email', 'phone', 'chat', 'video call',
        'in-person', 'webinar', 'workshop', 'training session', 'qbr',
        'quarterly business review', 'annual business review', 'executive briefing',
        'business review', 'success plan', 'success plan review', 'goals review',

        // Customer success metrics
        'cs metrics', 'success metrics', 'health metrics', 'nps',
        'net promoter score', 'csat', 'customer satisfaction score',
        'ces', 'customer effort score', 'chs', 'customer health score',
        'retention rate', 'customer retention rate', 'logo retention',
        'revenue retention', 'gross retention', 'net retention', 'ndr',
        'net dollar retention', 'gdr', 'gross dollar retention', 'churn rate',
        'customer churn rate', 'logo churn', 'revenue churn', 'arr churn',
        'mrr churn', 'expansion revenue', 'upsell revenue', 'cross-sell revenue',
        'customer lifetime value', 'ltv', 'clv', 'customer acquisition cost',
        'cac', 'ltv/cac', 'payback period', 'time to value', 'ttv',
        'time to first value', 'time to ongoing value', 'adoption rate',
        'feature adoption rate', 'user adoption rate', 'engagement score',
        'product engagement', 'stickiness', 'dau/mau', 'wau/mau',

        // Tools
        'gainsight', 'totango', 'churnzero', 'client success', 'planhat',
        'catalyst', 'vitally', 'custify', 'successcoaching', 'strikedeck',
        'salesforce', 'hubspot', 'zoho', 'dynamics 365', 'intercom',
        'drift', 'olark', 'crisp', 'zendesk', 'freshdesk', 'helpscout',
        'front', 'missive', 'outlook', 'gmail', 'mailchimp', 'customer.io',
        'iterable', 'braze', 'airship', 'onesignal', 'pushwoosh',
        'survey monkey', 'typeform', 'qualtrics', 'survicate', 'delighted',
        'asknicely', 'promoter.io', 'retently', 'wootric', 'satismeter',

        // Playbooks & Strategies
        'success playbook', 'customer journey mapping', 'touchpoint mapping',
        'customer segmentation', 'tiered success', 'tiered support',
        'high-touch', 'low-touch', 'tech-touch', 'digital success',
        'proactive outreach', 'reactive support', 'customer advocacy',
        'reference program', 'customer references', 'case studies',
        'testimonials', 'reviews', 'ratings', 'social proof', 'community building',
        'user groups', 'customer communities', 'forums', 'discussion boards',
        'knowledge base', 'help center', 'documentation', 'faq', 'self-service',
        'video tutorials', 'how-to guides', 'best practices', 'tips and tricks',
        'webinars', 'workshops', 'training', 'certification', 'user conference',
        'summit', 'meetup', 'user group meeting', 'customer advisory board',
        'cab', 'customer feedback', 'feedback loops', 'voice of customer',
        'voc', 'listening', 'customer insights', 'customer intelligence',
        'customer analytics', 'customer data', 'customer 360', 'single source of truth'
    ],

    'Human Resources': [
        'human resources', 'hr', 'hr generalist', 'hr specialist', 'hr manager',
        'hr director', 'head of hr', 'vp of hr', 'chief hr officer', 'chro',
        'people operations', 'people ops', 'people team', 'talent management',
        'talent acquisition', 'ta', 'recruitment', 'recruiting', 'recruiter',
        'sourcing', 'sourcer', 'talent sourcer', 'headhunter', 'executive search',
        'campus recruitment', 'university recruitment', 'graduate recruitment',
        'early career', 'internship program', 'apprenticeship', 'trainee program',
        'technical recruiting', 'tech recruiting', 'it recruiting', 'engineering recruiting',
        'sales recruiting', 'marketing recruiting', 'product recruiting',
        'design recruiting', 'creative recruiting', 'executive recruiting',
        'c-level recruiting', 'board recruitment', 'diversity recruiting',

        // Recruitment process
        'job description', 'jd', 'job posting', 'job ad', 'job advertisement',
        'job board', 'career site', 'ats', 'applicant tracking system',
        'crm', 'candidate relationship management', 'candidate sourcing',
        'boolean search', 'x-ray search', 'passive candidates', 'active candidates',
        'candidate pipeline', 'talent pipeline', 'talent pool', 'talent community',
        'candidate screening', 'resume screening', 'phone screen', 'video interview',
        'technical interview', 'hr interview', 'hiring manager interview',
        'panel interview', 'group interview', 'assessment', 'skills assessment',
        'personality test', 'cognitive test', 'case study', 'presentation',
        'portfolio review', 'work sample', 'take-home assignment', 'reference check',
        'background check', 'employment verification', 'education verification',
        'offer negotiation', 'offer letter', 'employment contract', 'onboarding',
        'new hire orientation', 'employee induction', 'offboarding', 'exit interview',

        // HR operations
        'hr operations', 'hr ops', 'hr administration', 'personnel administration',
        'employee records', 'personnel files', 'hr information system', 'hris',
        'hrms', 'human resource management system', 'workday', 'successfactors',
        'peoplesoft', 'oracle hcm', 'sap hcm', 'sap successfactors', 'bamboo',
        'bamboohr', 'gusto', 'zenefits', 'justworks', 'rippling', 'deel',
        'remote', 'letsdeel', 'omni', 'hibob', 'bob', 'factorial', 'personio',
        'payroll', 'payroll processing', 'payroll management', 'salary processing',
        'wage processing', 'payroll tax', 'payroll compliance', 'benefits administration',
        'health insurance', 'dental insurance', 'vision insurance', 'life insurance',
        'disability insurance', 'retirement plans', '401k', 'pension', 'stock options',
        'equity', 'rsu', 'restricted stock units', 'bonus', 'commission',
        'incentive compensation', 'total rewards', 'compensation', 'compensation management',
        'salary bands', 'salary ranges', 'pay bands', 'job grades', 'job levels',
        'job architecture', 'career framework', 'career ladders', 'career paths',

        // Employee relations & engagement
        'employee relations', 'employee engagement', 'employee experience', 'ex',
        'company culture', 'workplace culture', 'organizational culture', 'values',
        'mission', 'vision', 'employee voice', 'employee feedback', 'pulse surveys',
        'engagement surveys', 'stay interviews', 'exit interviews', 'action planning',
        'recognition', 'employee recognition', 'rewards', 'awards', 'service awards',
        'work anniversary', 'team building', 'company events', 'off-sites',
        'retreats', 'holiday party', 'summer party', 'happy hour', 'wellness',
        'employee wellness', 'wellbeing', 'mental health', 'eap', 'employee assistance program',
        'erg', 'employee resource groups', 'affinity groups', 'diversity', 'inclusion',
        'diversity and inclusion', 'd&i', 'dei', 'diversity equity inclusion',
        'belonging', 'equity', 'inclusivity', 'unconscious bias', 'microaggressions',
        'allyship', 'privilege', 'psychological safety', 'safe space',

        // Performance management
        'performance management', 'performance review', 'appraisal', 'evaluation',
        'annual review', 'mid-year review', 'quarterly review', '360 feedback',
        '360-degree feedback', 'upward feedback', 'peer feedback', 'self-assessment',
        'goal setting', 'okrs', 'objectives and key results', 'kpis', 'key performance indicators',
        'competencies', 'competency model', 'skills matrix', 'capabilities',
        'performance improvement plan', 'pip', 'coaching', 'mentoring',
        'career development', 'career planning', 'succession planning',
        'talent review', 'talent assessment', 'high potential', 'hi-po',
        'key talent', 'critical roles', 'flight risk', 'retention risk',
        '9-box grid', 'performance-potential matrix', 'calibration',
        'performance calibration', 'rating calibration', 'forced distribution',
        'stack ranking', 'rank and yank', 'up or out',

        // Learning & development
        'learning and development', 'l&d', 'training', 'employee training',
        'staff development', 'workforce development', 'capability development',
        'skills development', 'upskilling', 'reskilling', 'cross-skilling',
        'new hire training', 'onboarding training', 'orientation', 'compliance training',
        'mandatory training', 'soft skills training', 'leadership development',
        'management training', 'executive education', 'technical training',
        'product training', 'sales training', 'customer service training',
        'lms', 'learning management system', 'cornerstone', 'saba', 'sumtotal',
        'docebo', 'canvas', 'moodle', 'blackboard', 'coursera', 'linkedin learning',
        'udemy', 'pluralsight', 'skillsoft', 'crossknowledge', 'degreed',
        'pathstream', 'guild education', 'futurelearn', 'edx', 'khan academy',

        // HR compliance & legal
        'hr compliance', 'employment law', 'labor law', 'workplace law',
        'fair labor standards act', 'flsa', 'equal employment opportunity', 'eeo',
        'affirmative action', 'aa', 'office of federal contract compliance programs',
        'ofccp', 'family and medical leave act', 'fmla', 'americans with disabilities act',
        'ada', 'adaaa', 'pregnancy discrimination act', 'pda', 'age discrimination in employment act',
        'adea', 'title vii', 'civil rights act', 'occupational safety and health act',
        'osha', 'workers compensation', 'unemployment insurance', 'ui',
        'state disability insurance', 'sdi', 'paid family leave', 'pfl',
        'paid sick leave', 'minimum wage', 'overtime', 'exempt', 'non-exempt',
        'independent contractor', '1099', 'w-2', 'i-9', 'e-verify', 'immigration',
        'work visa', 'h1b', 'l1', 'opt', 'cpt', 'green card', 'permanent residency',
        'global mobility', 'international assignment', 'expatriate', 'expat',
        'repatriation', 'cross-border', 'remote work', 'hybrid work', 'telecommuting'
    ],

    'Finance & Accounting': [
        'finance', 'accounting', 'financial management', 'financial operations',
        'financial planning', 'financial analysis', 'financial reporting',
        'financial statements', 'balance sheet', 'income statement', 'profit and loss',
        'p&l', 'cash flow statement', 'statement of cash flows', 'statement of changes in equity',
        'footnotes', 'disclosures', 'management discussion and analysis', 'md&a',
        'annual report', '10-k', '10-q', '8-k', 'sec filing', 'edgar',
        'financial controls', 'internal controls', 'sox', 'sarbanes-oxley',
        'compliance', 'regulatory compliance', 'gaap', 'generally accepted accounting principles',
        'ifrs', 'international financial reporting standards', 'us gaap', 'uk gaap',
        'ind as', 'indian accounting standards', 'accounting standards',

        // Accounting functions
        'general ledger', 'gl', 'accounts payable', 'ap', 'accounts receivable', 'ar',
        'payroll', 'payroll accounting', 'fixed assets', 'asset accounting',
        'inventory accounting', 'cost accounting', 'management accounting',
        'financial accounting', 'tax accounting', 'fund accounting', 'project accounting',
        'revenue recognition', 'asc 606', 'ifrs 15', 'lease accounting', 'asc 842',
        'ifrs 16', 'stock-based compensation', 'equity accounting', 'business combinations',
        'acquisitions', 'mergers', 'consolidations', 'intercompany accounting',
        'transfer pricing', 'foreign exchange', 'fx accounting', 'hedge accounting',
        'derivatives accounting', 'fair value accounting', 'impairment testing',
        'goodwill', 'intangible assets', 'depreciation', 'amortization', 'accruals',
        'prepayments', 'deferred revenue', 'unearned revenue', 'accrued expenses',
        'provisions', 'contingencies', 'reserves', 'allowances', 'bad debt',
        'write-offs', 'write-downs', 'revaluations', 'mark-to-market',

        // Financial planning & analysis
        'fp&a', 'financial planning and analysis', 'budgeting', 'forecasting',
        'long-range planning', 'lrp', 'strategic planning', 'financial modeling',
        'three-statement model', 'discounted cash flow', 'dcf', 'comps',
        'comparable company analysis', 'precedent transactions', 'leveraged buyout',
        'lbo', 'merger model', 'accretion/dilution', 'sensitivity analysis',
        'scenario analysis', 'what-if analysis', 'variance analysis', 'budget vs actual',
        'forecast vs actual', 'prior year vs current year', 'trend analysis',
        'kpis', 'key performance indicators', 'metrics', 'financial metrics',
        'revenue', 'cost of goods sold', 'cogs', 'gross margin', 'operating expenses',
        'opex', 'ebitda', 'earnings before interest taxes depreciation amortization',
        'ebit', 'operating income', 'net income', 'earnings', 'profit', 'loss',
        'earnings per share', 'eps', 'return on equity', 'roe', 'return on assets',
        'roa', 'return on invested capital', 'roic', 'return on capital employed',
        'roce', 'working capital', 'current ratio', 'quick ratio', 'liquidity',
        'solvency', 'leverage', 'debt-to-equity', 'interest coverage',
        'days sales outstanding', 'dso', 'days inventory outstanding', 'dio',
        'days payable outstanding', 'dpo', 'cash conversion cycle', 'ccc',

        // Corporate finance
        'corporate finance', 'capital structure', 'debt financing', 'equity financing',
        'venture capital', 'vc', 'private equity', 'pe', 'growth equity',
        'mezzanine financing', 'bridge financing', 'working capital financing',
        'asset-based lending', 'abl', 'invoice factoring', 'supply chain finance',
        'trade finance', 'project finance', 'infrastructure finance',
        'structured finance', 'securitization', 'abs', 'asset-backed securities',
        'mbs', 'mortgage-backed securities', 'cdo', 'collateralized debt obligations',
        'cbo', 'clo', 'cdo-squared', 'credit derivatives', 'cds', 'credit default swaps',
        'capital markets', 'equity capital markets', 'ecm', 'debt capital markets',
        'dcm', 'ipo', 'initial public offering', 'follow-on offering', 'secondary offering',
        'private placement', 'rights issue', 'convertible debt', 'convertible bonds',
        'high-yield debt', 'junk bonds', 'investment grade', 'syndicated loans',
        'term loans', 'revolver', 'revolving credit facility', 'letter of credit',
        'lc', 'bank guarantees', 'surety bonds', 'insurance bonds',

        // Tax
        'tax', 'taxation', 'corporate tax', 'business tax', 'individual tax',
        'personal tax', 'income tax', 'capital gains tax', 'dividend tax',
        'withholding tax', 'wht', 'value-added tax', 'vat', 'goods and services tax',
        'gst', 'sales tax', 'use tax', 'excise tax', 'customs duty', 'tariff',
        'transfer pricing', 'arm\'s length principle', 'oecd', 'beps',
        'base erosion and profit shifting', 'tax planning', 'tax strategy',
        'tax compliance', 'tax return', 'tax filing', 'tax provision', 'tax accounting',
        'tax reserves', 'tax contingencies', 'tax audit', 'tax controversy',
        'tax litigation', 'tax rulings', 'tax treaties', 'double taxation',
        'foreign tax credit', 'ftc', 'deferred tax', 'dtl', 'deferred tax liability',
        'dta', 'deferred tax asset', 'valuation allowance', 'permanent differences',
        'temporary differences', 'tax basis', 'tax depreciation', 'capital allowances',

        // Treasury
        'treasury', 'treasury management', 'cash management', 'liquidity management',
        'working capital management', 'cash forecasting', 'cash positioning',
        'bank account management', 'bank reconciliation', 'payment processing',
        'payment operations', 'ach', 'automated clearing house', 'wire transfers',
        'swift', 'sepa', 'single euro payments area', 'checks', 'electronic payments',
        'credit cards', 'debit cards', 'p-cards', 'procurement cards', 't&e',
        'travel and entertainment', 'expense management', 'petty cash',
        'investment management', 'short-term investments', 'marketable securities',
        'treasury bills', 't-bills', 'commercial paper', 'certificates of deposit',
        'cds', 'repos', 'repurchase agreements', 'reverse repos', 'money market funds',
        'mmf', 'debt management', 'debt covenants', 'debt compliance',
        'interest rate risk', 'foreign exchange risk', 'currency risk', 'fx risk',
        'hedging', 'derivatives', 'forwards', 'futures', 'options', 'swaps',
        'interest rate swaps', 'currency swaps', 'cross-currency swaps',
        'fx forwards', 'fx options', 'caps', 'floors', 'collars',

        // Audit
        'audit', 'auditing', 'internal audit', 'external audit', 'financial audit',
        'operational audit', 'compliance audit', 'information technology audit',
        'it audit', 'integrated audit', 'sox audit', 'risk-based audit',
        'audit planning', 'audit execution', 'audit reporting', 'audit findings',
        'audit recommendations', 'audit committee', 'audit trail', 'audit evidence',
        'substantive testing', 'tests of controls', 'sampling', 'audit sampling',
        'materiality', 'performance materiality', 'tolerable error', 'detection risk',
        'inherent risk', 'control risk', 'audit risk', 'audit opinion',
        'unqualified opinion', 'clean opinion', 'qualified opinion', 'adverse opinion',
        'disclaimer of opinion', 'going concern', 'emphasis of matter',
        'key audit matters', 'kams', 'critical audit matters', 'cams',

        // Tools & Systems
        'erp', 'enterprise resource planning', 'sap', 'sap fi', 'sap co',
        'sap fico', 'oracle financials', 'oracle ebs', 'oracle cloud', 'netsuite',
        'workday financials', 'microsoft dynamics', 'dynamics 365 finance',
        'dynamics 365 business central', 'infor', 'epicor', 'sage', 'quickbooks',
        'xero', 'freshbooks', 'wave', 'zoho books', 'accounting software',
        'excel', 'advanced excel', 'vba', 'macros', 'pivot tables', 'vlookup',
        'index match', 'power query', 'power pivot', 'power bi', 'tableau',
        'qlikview', 'qliksense', 'cognos', 'hyperion', 'oracle hyperion',
        'anaplan', 'adaptive insights', 'workiva', 'blackline', 'floQast',
        'trintech', 'reconart', 'excelerate', 'tidemark', 'host analytics',

        // Certifications
        'cpa', 'certified public accountant', 'acca', 'association of chartered certified accountants',
        'cima', 'chartered institute of management accountants', 'cgma', 'chartered global management accountant',
        'ca', 'chartered accountant', 'cfa', 'chartered financial analyst',
        'cfp', 'certified financial planner', 'cma', 'certified management accountant',
        'cia', 'certified internal auditor', 'cisa', 'certified information systems auditor',
        'cism', 'certified information security manager', 'crisc', 'certified in risk and information systems control',
        'cfe', 'certified fraud examiner', 'cfa', 'cfa charterholder', 'cfa candidate',
        'frm', 'financial risk manager', 'prm', 'professional risk manager',
        'csc', 'canadian securities course', 'series 7', 'series 63', 'series 65',
        'series 66', 'life insurance license', 'health insurance license'
    ],

    'Healthcare & Medical': [
        'healthcare', 'health care', 'medical', 'clinical', 'patient care',
        'healthcare administration', 'healthcare management', 'hospital administration',
        'hospital management', 'clinic management', 'practice management',
        'medical practice management', 'healthcare operations', 'clinical operations',

        // Clinical roles
        'physician', 'doctor', 'md', 'do', 'medical doctor', 'doctor of osteopathy',
        'specialist', 'surgeon', 'general surgeon', 'neurosurgeon', 'cardiothoracic surgeon',
        'orthopedic surgeon', 'plastic surgeon', 'vascular surgeon', 'trauma surgeon',
        'cardiologist', 'interventional cardiologist', 'electrophysiologist',
        'neurologist', 'neurosurgeon', 'psychiatrist', 'psychologist', 'therapist',
        'counselor', 'social worker', 'clinical social worker', 'lsw', 'lcsw',
        'lmsw', 'lmft', 'licensed marriage and family therapist', 'lpc', 'licensed professional counselor',
        'psychologist', 'clinical psychologist', 'counseling psychologist', 'school psychologist',
        'neuropsychologist', 'forensic psychologist', 'health psychologist',
        'pediatrician', 'family medicine', 'family practice', 'internal medicine',
        'internist', 'hospitalist', 'intensivist', 'critical care', 'emergency medicine',
        'er doctor', 'emergency physician', 'urgent care', 'primary care', 'pcp',
        'obstetrician', 'gynecologist', 'ob/gyn', 'obstetrics and gynecology',
        'maternal-fetal medicine', 'perinatologist', 'neonatologist', 'neonatal',
        'pediatric subspecialty', 'pediatric cardiology', 'pediatric oncology',
        'pediatric neurology', 'pediatric surgery', 'pediatric emergency medicine',
        'anesthesiologist', 'anesthesiology', 'nurse anesthetist', 'crna', 'certified registered nurse anesthetist',
        'radiologist', 'radiology', 'interventional radiology', 'diagnostic radiology',
        'radiation oncology', 'radiation oncologist', 'pathologist', 'pathology',
        'clinical pathology', 'anatomical pathology', 'forensic pathology', 'dermatologist',
        'dermatology', 'mohs surgeon', 'ophthalmologist', 'ophthalmology', 'optometrist',
        'optometry', 'dentist', 'dentistry', 'orthodontist', 'orthodontics',
        'periodontist', 'endodontist', 'oral surgeon', 'oral and maxillofacial surgeon',
        'prosthodontist', 'pediatric dentist', 'dentist anesthesiologist',
        'veterinarian', 'vet', 'veterinary medicine', 'veterinary surgeon',
        'veterinary specialist', 'veterinary pathologist', 'veterinary radiologist',

        // Nursing
        'nurse', 'registered nurse', 'rn', 'licensed practical nurse', 'lpn',
        'licensed vocational nurse', 'lvn', 'advanced practice registered nurse', 'aprn',
        'nurse practitioner', 'np', 'family nurse practitioner', 'fnp',
        'adult-gerontology nurse practitioner', 'agnp', 'pediatric nurse practitioner', 'pnp',
        'neonatal nurse practitioner', 'nnp', 'psychiatric nurse practitioner', 'pmhnp',
        'women\'s health nurse practitioner', 'whnp', 'acute care nurse practitioner', 'acnp',
        'emergency nurse practitioner', 'enp', 'orthopedic nurse practitioner', 'onp',
        'clinical nurse specialist', 'cns', 'certified nurse midwife', 'cnm',
        'certified registered nurse anesthetist', 'crna', 'nurse educator',
        'nurse manager', 'nurse supervisor', 'nurse administrator', 'chief nursing officer',
        'cno', 'director of nursing', 'don', 'nurse executive', 'charge nurse',
        'staff nurse', 'floor nurse', 'bedside nurse', 'icu nurse', 'intensive care unit',
        'critical care nurse', 'ccu nurse', 'coronary care unit', 'emergency room nurse',
        'er nurse', 'trauma nurse', 'operating room nurse', 'or nurse', 'perioperative nurse',
        'surgical nurse', 'post-anesthesia care unit nurse', 'pacu nurse', 'recovery room nurse',
        'labor and delivery nurse', 'l&d nurse', 'postpartum nurse', 'mother-baby nurse',
        'newborn nursery nurse', 'neonatal intensive care unit nurse', 'nicu nurse',
        'pediatric nurse', 'peds nurse', 'pediatric intensive care unit nurse', 'picu nurse',
        'medical-surgical nurse', 'med-surg nurse', 'oncology nurse', 'oncology',
        'chemotherapy nurse', 'infusion nurse', 'dialysis nurse', 'nephrology nurse',
        'transplant nurse', 'telemetry nurse', 'progressive care nurse', 'step-down nurse',
        'cardiac nurse', 'cardiology nurse', 'interventional cardiology nurse',
        'catheterization lab nurse', 'cath lab nurse', 'interventional radiology nurse',
        'ir nurse', 'radiology nurse', 'diagnostic imaging nurse', 'rehabilitation nurse',
        'rehab nurse', 'skilled nursing facility nurse', 'snf nurse', 'long-term care nurse',
        'ltc nurse', 'home health nurse', 'hospice nurse', 'palliative care nurse',
        'school nurse', 'camp nurse', 'occupational health nurse', 'corporate nurse',
        'flight nurse', 'transport nurse', 'military nurse', 'public health nurse',
        'community health nurse', 'parish nurse', 'faith community nurse',

        // Allied health
        'physical therapist', 'pt', 'physical therapy', 'physiotherapist',
        'physiotherapy', 'occupational therapist', 'ot', 'occupational therapy',
        'speech-language pathologist', 'slp', 'speech therapy', 'speech pathologist',
        'audiologist', 'audiology', 'hearing specialist', 'respiratory therapist',
        'respiratory therapy', 'rt', 'respiratory care', 'pulmonary function technologist',
        'pft', 'sleep technologist', 'polysomnographic technologist', 'psg tech',
        'cardiovascular technologist', 'vascular technologist', 'echocardiographer',
        'echo tech', 'sonographer', 'ultrasound technologist', 'diagnostic medical sonographer',
        'radiologic technologist', 'rad tech', 'x-ray technologist', 'x-ray tech',
        'ct technologist', 'cat scan technologist', 'mri technologist', 'magnetic resonance imaging',
        'mammography technologist', 'mammo tech', 'nuclear medicine technologist',
        'nuc med tech', 'pet technologist', 'radiation therapist', 'radiation therapy',
        'dosimetrist', 'medical dosimetrist', 'clinical laboratory scientist', 'cls',
        'medical laboratory scientist', 'mls', 'medical technologist', 'mt',
        'clinical laboratory technician', 'clt', 'medical laboratory technician', 'mlt',
        'phlebotomist', 'phlebotomy', 'blood bank technologist', 'immunohematology',
        'histotechnologist', 'histology', 'histotechnician', 'cytotechnologist',
        'cytology', 'pathology assistant', 'pathologists',
        'genetic counselor', 'genetics', 'genomics', 'dietitian', 'registered dietitian',
        'rd', 'nutritionist', 'clinical dietitian', 'sports dietitian', 'nutrition',
        'pharmacist', 'pharmacy', 'clinical pharmacist', 'hospital pharmacist',
        'retail pharmacist', 'community pharmacist', 'pharmacy technician', 'pharm tech',
        'paramedic', 'emergency medical technician', 'emt', 'advanced emt', 'aemt',
        'critical care paramedic', 'ccp', 'flight paramedic', 'wilderness paramedic',
        'athletic trainer', 'atc', 'certified athletic trainer', 'exercise physiologist',
        'kinesiologist', 'fitness trainer', 'personal trainer', 'group fitness instructor',
        'yoga teacher', 'pilates instructor', 'meditation teacher', 'mindfulness instructor',
        'massage therapist', 'massage therapy', 'licensed massage therapist', 'lmt',
        'acupuncturist', 'acupuncture', 'traditional chinese medicine', 'tcm',
        'chiropractor', 'chiropractic', 'dc', 'naturopath', 'naturopathic doctor', 'nd',
        'homeopath', 'homeopathy', 'ayurvedic practitioner', 'ayurveda',
        'art therapist', 'music therapist', 'dance therapist', 'recreational therapist',
        'horticultural therapist', 'animal-assisted therapist', 'equine therapist',

        // Healthcare administration
        'healthcare administrator', 'hospital administrator', 'clinic administrator',
        'practice administrator', 'practice manager', 'medical practice manager',
        'healthcare manager', 'health services manager', 'clinical manager',
        'nurse manager', 'unit manager', 'department manager', 'director of nursing',
        'clinical director', 'medical director', 'chief medical officer', 'cmo',
        'chief nursing officer', 'cno', 'chief operating officer', 'coo', 'ceo',
        'chief executive officer', 'cfo', 'chief financial officer', 'cio',
        'chief information officer', 'chief medical information officer', 'cmio',
        'chief quality officer', 'cqo', 'chief patient experience officer', 'cxo',
        'compliance officer', 'privacy officer', 'hipaa compliance', 'risk manager',
        'patient safety officer', 'infection control', 'infection preventionist',
        'utilization review', 'case management', 'care coordination', 'patient navigation',
        'patient access', 'patient registration', 'admissions', 'scheduling',
        'insurance verification', 'eligibility', 'prior authorization', 'pre-certification',
        'medical billing', 'medical coding', 'health information management', 'him',
        'medical records', 'health records', 'emr', 'electronic medical records',
        'ehr', 'electronic health records', 'practice management system', 'pms',
        'epic', 'epic systems', 'cerner', 'meditech', 'allscripts', 'athenahealth',
        'nextgen', 'eclinicalworks', 'ge healthcare', 'philips healthcare',
        'siemens healthineers', 'ge medical', 'canon medical', 'fujifilm medical',
        'agfa healthcare', 'carestream', 'merge healthcare', 'ibm watson health',

        // Healthcare regulations & compliance
        'hipaa', 'health insurance portability and accountability act',
        'hcfa', 'cms', 'centers for medicare and medicaid services', 'medicare',
        'medicaid', 'tricare', 'va', 'veterans affairs', 'indian health service',
        'ihs', 'joint commission', 'jc', 'tjc', 'accreditation', 'certification',
        'dnv', 'det norske veritas', 'hfap', 'healthcare facilities accreditation program',
        'ur ac', 'utilization review accreditation commission', 'ncoa',
        'national committee for quality assurance', 'ncqa', 'hqip', 'ihi',
        'institute for healthcare improvement', 'ahrq', 'agency for healthcare research and quality',
        'fda', 'food and drug administration', 'ema', 'european medicines agency',
        'mhra', 'medicines and healthcare products regulatory agency', 'pmda',
        'pharmaceuticals and medical devices agency', 'cdsco', 'central drugs standard control organization',
        'jci', 'joint commission international', 'iso 9001', 'iso 13485',
        'fda 21 cfr part 11', 'gmp', 'good manufacturing practices', 'gcp',
        'good clinical practices', 'glp', 'good laboratory practices', 'gdp',
        'good distribution practices', 'qms', 'quality management system',
        'cap', 'college of american pathologists', 'clia', 'clinical laboratory improvement amendments',
        'coa', 'commission on accreditation', 'carf', 'commission on accreditation of rehabilitation facilities',

        // Healthcare specialties
        'cardiology', 'cardiovascular', 'heart', 'cardiac', 'electrophysiology',
        'interventional cardiology', 'invasive cardiology', 'non-invasive cardiology',
        'vascular medicine', 'peripheral vascular', 'pvd', 'pulmonary', 'pulmonology',
        'lung', 'respiratory', 'sleep medicine', 'critical care', 'intensive care',
        'icu', 'ccu', 'micu', 'sicu', 'picu', 'nicu', 'emergency medicine',
        'trauma', 'burn', 'surgery', 'general surgery', 'cardiothoracic surgery',
        'vascular surgery', 'neurosurgery', 'orthopedic surgery', 'orthopaedics',
        'spine surgery', 'hand surgery', 'foot and ankle surgery', 'sports medicine',
        'plastic surgery', 'reconstructive surgery', 'cosmetic surgery', 'burn surgery',
        'trauma surgery', 'surgical critical care', 'transplant surgery', 'organ transplant',
        'kidney transplant', 'liver transplant', 'pancreas transplant', 'heart transplant',
        'lung transplant', 'bone marrow transplant', 'stem cell transplant',
        'oncology', 'cancer', 'medical oncology', 'radiation oncology', 'surgical oncology',
        'gynecologic oncology', 'pediatric oncology', 'neuro-oncology', 'hematology',
        'hematologic oncology', 'blood disorders', 'bone marrow disorders',
        'neurology', 'neuroscience', 'brain', 'nervous system', 'stroke',
        'movement disorders', 'parkinson\'s disease', 'alzheimer\'s disease',
        'dementia', 'multiple sclerosis', 'ms', 'epilepsy', 'seizure',
        'headache', 'migraine', 'neuromuscular', 'als', 'lou gehrig\'s disease',
        'peripheral neuropathy', 'autonomic disorders', 'sleep disorders',
        'neurocritical care', 'neurointerventional', 'neurointerventional surgery',
        'psychiatry', 'mental health', 'behavioral health', 'addiction psychiatry',
        'addiction medicine', 'child and adolescent psychiatry', 'geriatric psychiatry',
        'consultation-liaison psychiatry', 'forensic psychiatry', 'psychosomatic medicine',
        'emergency psychiatry', 'military psychiatry', 'community psychiatry',
        'rehabilitation', 'physical medicine and rehabilitation', 'pm&r', 'physiatry',
        'brain injury', 'spinal cord injury', 'stroke rehabilitation',
        'amputee rehabilitation', 'musculoskeletal rehabilitation', 'sports rehabilitation',
        'cardiac rehabilitation', 'pulmonary rehabilitation', 'vestibular rehabilitation',
        'pediatric rehabilitation', 'geriatric rehabilitation', 'occupational rehabilitation',
        'vocational rehabilitation', 'work hardening', 'work conditioning',
        'functional restoration', 'pain management', 'chronic pain', 'acute pain',
        'interventional pain', 'pain medicine', 'palliative care', 'hospice',
        'end-of-life care', 'terminal care', 'comfort care', 'supportive care',
        'geriatrics', 'geriatric medicine', 'elder care', 'senior care',
        'long-term care', 'skilled nursing', 'assisted living', 'memory care',
        'alzheimer\'s care', 'dementia care', 'hospice care', 'palliative care',
        'women\'s health', 'obstetrics', 'gynecology', 'maternal health',
        'prenatal care', 'postnatal care', 'postpartum care', 'family planning',
        'contraception', 'fertility', 'infertility', 'reproductive endocrinology',
        'reproductive medicine', 'ivf', 'in vitro fertilization', 'icsi',
        'egg freezing', 'embryo freezing', 'sperm banking', 'menopause',
        'perimenopause', 'postmenopause', 'hormone therapy', 'hrt',
        'men\'s health', 'andrology', 'low testosterone', 'hypogonadism',
        'erectile dysfunction', 'ed', 'premature ejaculation', 'male infertility',
        'prostate', 'prostate cancer', 'prostatitis', 'bph', 'benign prostatic hyperplasia',
        'testicular cancer', 'penile cancer', 'pediatrics', 'children\'s health',
        'adolescent medicine', 'developmental pediatrics', 'behavioral pediatrics',
        'neurodevelopmental', 'autism', 'asd', 'adhd', 'learning disabilities',
        'developmental delay', 'genetics', 'genetic disorders', 'birth defects',
        'prenatal genetics', 'pediatric genetics', 'adult genetics', 'cancer genetics',
        'genetic counseling', 'genetic testing', 'genomic medicine', 'precision medicine',
        'personalized medicine', 'pharmacogenomics', 'pharmacogenetics',
        'immunology', 'immune system', 'allergy', 'immunodeficiency', 'autoimmune',
        'rheumatology', 'arthritis', 'lupus', 'sle', 'sjogren\'s', 'scleroderma',
        'myositis', 'vasculitis', 'gout', 'pseudogout', 'fibromyalgia',
        'endocrinology', 'hormones', 'diabetes', 'type 1 diabetes', 'type 2 diabetes',
        'gestational diabetes', 'thyroid', 'hypothyroidism', 'hyperthyroidism',
        'grave\'s disease', 'hashimoto\'s', 'parathyroid', 'calcium disorders',
        'pituitary', 'adrenal', 'cushing\'s', 'addison\'s', 'menopause',
        'osteoporosis', 'bone density', 'metabolic bone disease', 'lipid disorders',
        'cholesterol', 'dyslipidemia', 'metabolic syndrome', 'obesity',
        'weight management', 'bariatrics', 'bariatric medicine', 'nutrition',
        'gastroenterology', 'digestive system', 'gi', 'esophagus', 'stomach',
        'small intestine', 'large intestine', 'colon', 'rectum', 'liver',
        'gallbladder', 'pancreas', 'hepatology', 'hepatitis', 'cirrhosis',
        'nonalcoholic fatty liver disease', 'nafld', 'nash', 'inflammatory bowel disease',
        'ibd', 'crohn\'s disease', 'ulcerative colitis', 'ibs', 'irritable bowel syndrome',
        'celiac disease', 'gluten intolerance', 'food allergies', 'food intolerances',
        'nephrology', 'kidney', 'renal', 'ckd', 'chronic kidney disease',
        'esrd', 'end-stage renal disease', 'dialysis', 'hemodialysis', 'peritoneal dialysis',
        'kidney transplant', 'glomerulonephritis', 'nephrotic syndrome', 'polycystic kidney disease',
        'pkd', 'electrolyte disorders', 'acid-base disorders', 'hypertension',
        'high blood pressure', 'urgent care', 'walk-in clinic', 'convenient care',
        'retail clinic', 'minute clinic', 'primary care', 'family practice',
        'internal medicine', 'general practice', 'preventive medicine', 'wellness',
        'health promotion', 'disease prevention', 'population health', 'public health',
        'community health', 'global health', 'rural health', 'urban health',
        'environmental health', 'occupational health', 'travel medicine',
        'wilderness medicine', 'disaster medicine', 'humanitarian medicine',
        'military medicine', 'space medicine', 'hyperbaric medicine', 'diving medicine',
        'sports medicine', 'exercise medicine', 'team physician', 'event medicine',
        'performing arts medicine', 'dance medicine', 'music medicine'
    ],

    'Legal & Compliance': [
        'legal', 'law', 'attorney', 'lawyer', 'counsel', 'legal counsel',
        'general counsel', 'chief legal officer', 'clo', 'legal department',
        'legal team', 'legal services', 'legal advice', 'legal opinion',
        'legal research', 'legal writing', 'legal drafting', 'legal review',
        'legal analysis', 'legal strategy', 'legal operations', 'legal ops',

        // Practice areas
        'corporate law', 'business law', 'commercial law', 'contract law',
        'mergers and acquisitions', 'm&a', 'corporate governance', 'securities law',
        'capital markets', 'private equity', 'venture capital', 'joint ventures',
        'strategic alliances', 'partnerships', 'llc', 'corporation', 'c-corp',
        's-corp', 'b-corp', 'nonprofit', 'non-profit', 'tax-exempt', '501c3',
        'corporate formation', 'incorporation', 'business registration',
        'corporate maintenance', 'corporate compliance', 'corporate secretary',
        'board of directors', 'board meetings', 'board resolutions', 'shareholder agreements',
        'operating agreements', 'bylaws', 'articles of incorporation',
        'litigation', 'civil litigation', 'commercial litigation', 'business litigation',
        'securities litigation', 'class action', 'mass tort', 'product liability',
        'personal injury', 'medical malpractice', 'legal malpractice',
        'professional liability', 'construction litigation', 'real estate litigation',
        'employment litigation', 'labor litigation', 'intellectual property litigation',
        'patent litigation', 'trademark litigation', 'copyright litigation',
        'trade secret litigation', 'antitrust litigation', 'competition litigation',
        'regulatory litigation', 'administrative law', 'appeals', 'appellate law',
        'trial practice', 'trial advocacy', 'courtroom advocacy', 'motions practice',
        'discovery', 'e-discovery', 'ediscovery', 'document review', 'depositions',
        'interrogatories', 'requests for production', 'requests for admission',
        'expert witnesses', 'expert testimony', 'trial preparation', 'trial strategy',
        'settlement', 'negotiation', 'mediation', 'arbitration', 'alternative dispute resolution',
        'adr', 'dispute resolution', 'conflict resolution',

        // Transactional law
        'transactional law', 'transactional practice', 'deal making',
        'contract drafting', 'contract negotiation', 'contract review',
        'contract management', 'agreements', 'licensing agreements', 'license agreements',
        'franchise agreements', 'distribution agreements', 'supply agreements',
        'purchase agreements', 'sales agreements', 'service agreements',
        'consulting agreements', 'professional services agreements', 'statements of work',
        'sow', 'master services agreements', 'msa', 'service level agreements', 'sla',
        'non-disclosure agreements', 'nda', 'confidentiality agreements',
        'mutual nda', 'one-way nda', 'unilateral nda', 'bilateral nda',
        'terms of service', 'tos', 'terms and conditions', 't&c', 'end user license agreements',
        'eula', 'privacy policies', 'privacy statements', 'cookie policies',
        'website terms', 'app terms', 'mobile terms', 'platform terms',
        'marketplace terms', 'vendor agreements', 'supplier agreements', 'procurement agreements',
        'outsourcing agreements', 'offshoring agreements', 'nearshoring agreements',
        'employment agreements', 'employment contracts', 'offer letters', 'severance agreements',
        'separation agreements', 'release agreements', 'independent contractor agreements',
        'consulting agreements', 'advisor agreements', 'board observer agreements',
        'stock purchase agreements', 'spa', 'asset purchase agreements', 'apa',
        'merger agreements', 'acquisition agreements', 'joint venture agreements', 'jva',
        'partnership agreements', 'limited partnership agreements', 'lpa',
        'limited liability company agreements', 'llc agreements', 'operating agreements',
        'shareholders agreements', 'shareholder agreements', 'investor rights agreements',
        'voting agreements', 'drag-along rights', 'tag-along rights', 'right of first refusal',
        'rofr', 'pre-emptive rights', 'participation rights', 'information rights',
        'registration rights', 'demand rights', 'piggyback rights',

        // Intellectual property
        'intellectual property', 'ip', 'patents', 'patent law', 'patent prosecution',
        'patent drafting', 'patent applications', 'provisional patent', 'non-provisional patent',
        'pct applications', 'patent cooperation treaty', 'foreign patent', 'international patent',
        'patent infringement', 'patent validity', 'patentability', 'prior art',
        'patent search', 'freedom to operate', 'fto', 'patent landscape',
        'patent portfolio', 'patent strategy', 'patent monetization', 'patent licensing',
        'patent litigation', 'patent enforcement', 'patent defense', 'patent challenges',
        'inter partes review', 'ipr', 'post-grant review', 'pgr', 'covered business method',
        'cbm', 'reexamination', 'reissue', 'trademarks', 'trademark law',
        'trademark registration', 'trademark applications', 'trademark search',
        'clearance search', 'trademark clearance', 'trademark prosecution',
        'trademark maintenance', 'trademark renewals', 'trademark oppositions',
        'trademark cancellations', 'trademark infringement', 'trademark enforcement',
        'trademark licensing', 'trademark portfolio', 'trademark strategy',
        'brand protection', 'anti-counterfeiting', 'cease and desist', 'opposition',
        'cancellation', 'trademark watch', 'trademark monitoring', 'copyright',
        'copyright law', 'copyright registration', 'copyright applications',
        'copyright protection', 'copyright infringement', 'copyright enforcement',
        'copyright licensing', 'fair use', 'fair dealing', 'public domain',
        'creative commons', 'open source', 'trade secrets', 'trade secret protection',
        'confidential information', 'proprietary information', 'know-how',
        'confidentiality', 'non-disclosure', 'non-compete', 'non-solicitation',
        'employee ip', 'assignment of inventions', 'work for hire',
        'industrial design', 'design patents', 'design rights', 'integrated circuits',
        'semiconductor protection', 'mask works', 'plant patents', 'plant variety protection',
        'geographical indications', 'appellations of origin', 'traditional knowledge',

        // Regulatory compliance
        'regulatory', 'regulatory compliance', 'regulatory affairs', 'regulatory law',
        'government regulations', 'agency regulations', 'administrative law',
        'healthcare regulatory', 'fda', 'food and drug administration', 'ema',
        'european medicines agency', 'mhra', 'pmda', 'pharmaceutical regulations',
        'drug regulations', 'medical device regulations', 'biologics regulations',
        'clinical trial regulations', 'good clinical practice', 'gcp',
        'good manufacturing practice', 'gmp', 'good laboratory practice', 'glp',
        'pharmacovigilance', 'drug safety', 'adverse events', 'product recalls',
        'labeling regulations', 'packaging regulations', 'advertising regulations',
        'promotional regulations', 'healthcare compliance', 'hipaa', 'health insurance portability and accountability act',
        'hitech', 'hi-tech act', 'health information technology', 'privacy rule',
        'security rule', 'breach notification', 'omnibus rule', 'cms regulations',
        'medicare', 'medicaid', 'anti-kickback statute', 'stark law', 'false claims act',
        'qui tam', 'whistleblower', 'fraud and abuse', 'healthcare fraud',
        'financial services regulations', 'banking regulations', 'securities regulations',
        'sec', 'securities and exchange commission', 'finra', 'financial industry regulatory authority',
        'fdic', 'federal deposit insurance corporation', 'occ', 'office of the comptroller of the currency',
        'federal reserve', 'consumer financial protection bureau', 'cfpb',
        'dodd-frank', 'wall street reform', 'volcker rule', 'bank secrecy act',
        'bsa', 'anti-money laundering', 'aml', 'know your customer', 'kyc',
        'customer due diligence', 'cdd', 'enhanced due diligence', 'edd',
        'patriot act', 'office of foreign assets control', 'ofac', 'sanctions',
        'economic sanctions', 'trade sanctions', 'export controls', 'ear',
        'export administration regulations', 'itar', 'international traffic in arms regulations',
        'ddtc', 'directorate of defense trade controls', 'bureau of industry and security',
        'bis', 'customs regulations', 'import regulations', 'tariffs', 'duties',
        'trade agreements', 'free trade agreements', 'fta', 'wto', 'world trade organization',
        'antitrust', 'competition law', 'monopolies', 'restraint of trade',
        'cartels', 'price fixing', 'market allocation', 'bid rigging',
        'monopolization', 'attempted monopolization', 'tying', 'bundling',
        'exclusive dealing', 'predatory pricing', 'antitrust compliance',
        'merger control', 'hart-scott-rodino', 'hsr', 'ftc', 'federal trade commission',
        'doj antitrust', 'department of justice', 'european commission competition',
        'data privacy', 'privacy law', 'data protection', 'gdpr', 'general data protection regulation',
        'ccpa', 'california consumer privacy act', 'cpra', 'california privacy rights act',
        'lgpd', 'brazilian data protection law', 'pipeda', 'canadian privacy law',
        'apra', 'australian privacy act', 'pipa', 'south korean privacy law',
        'pdpb', 'indonesian privacy law', 'pdpa', 'thailand privacy law',
        'data protection act', 'uk gdpr', 'swiss fadp', 'privacy shield',
        'standard contractual clauses', 'sccs', 'binding corporate rules', 'bcr',
        'data processing agreements', 'dpa', 'data protection impact assessment',
        'dpia', 'privacy impact assessment', 'pia', 'data mapping', 'data inventory',
        'data subject access requests', 'dsar', 'data subject rights', 'right to access',
        'right to rectification', 'right to erasure', 'right to be forgotten',
        'right to restriction', 'right to data portability', 'right to object',
        'automated decision making', 'profiling', 'consent', 'opt-in', 'opt-out',
        'cookies', 'tracking', 'behavioral advertising', 'targeted advertising',
        'privacy by design', 'privacy by default', 'data minimization',
        'purpose limitation', 'storage limitation', 'accuracy', 'integrity',
        'confidentiality', 'accountability', 'data security', 'cybersecurity',
        'information security', 'infosec', 'security compliance',

        // Legal operations & technology
        'legal operations', 'legal ops', 'legal technology', 'legal tech',
        'law practice management', 'legal project management', 'legal process improvement',
        'legal workflow', 'legal automation', 'contract management', 'contract lifecycle management',
        'clm', 'document management', 'document automation', 'document assembly',
        'e-discovery', 'electronic discovery', 'litigation support', 'legal hold',
        'ediscovery software', 'relativity', 'nuix', 'disco', 'everlaw',
        'logikcull', 'kCura', 'exterro', 'zapproved', 'cloudnine',
        'legal research tools', 'westlaw', 'lexisnexis', 'bloomberg law',
        'practical law', 'vital law', 'casemaker', 'fastcase', 'courtlink',
        'pacer', 'legal billing', 'e-billing', 'legal invoicing', 'legal spend management',
        'legal project management tools', 'legal hold software', 'legal analytics',
        'predictive analytics', 'legal AI', 'artificial intelligence in law',
        'legal chatbots', 'legal virtual assistants', 'online dispute resolution',
        'odr', 'legalzoom', 'rocket lawyer', 'avvo', 'legal shield',
        'law practice management software', 'clio', 'mycase', 'practice panther',
        'cosmolex', 'zola suite', 'abacus law', 'amicus attorney', 'needles',
        'tabs3', 'billing matters', 'bill4time', 'freshbooks', 'quickbooks',
        'time tracking', 'timekeeping', 'legal accounting', 'trust accounting',
        'iolta', 'client trust accounts', 'escrow accounts',

        // Legal roles & titles
        'partner', 'associate', 'of counsel', 'counsel', 'special counsel',
        'senior counsel', 'managing partner', 'managing attorney', 'founding partner',
        'name partner', 'equity partner', 'non-equity partner', 'income partner',
        'salaried partner', 'junior partner', 'senior associate', 'mid-level associate',
        'junior associate', 'first-year associate', 'summer associate', 'law clerk',
        'paralegal', 'legal assistant', 'legal secretary', 'legal administrative assistant',
        'legal executive', 'legal executive officer', 'company secretary',
        'corporate secretary', 'board secretary', 'in-house counsel', 'corporate counsel',
        'associate general counsel', 'agc', 'deputy general counsel', 'assistant general counsel',
        'chief legal officer', 'clo', 'general counsel', 'gc', 'head of legal',
        'director of legal', 'vp legal', 'svp legal', 'evp legal',
        'legal consultant', 'legal advisor', 'legal counsel', 'legal analyst',
        'legal researcher', 'law librarian', 'legal information specialist',
        'compliance officer', 'chief compliance officer', 'cco', 'compliance manager',
        'compliance specialist', 'compliance analyst', 'regulatory affairs manager',
        'regulatory affairs specialist', 'regulatory analyst', 'privacy officer',
        'chief privacy officer', 'cpo', 'data protection officer', 'dpo',
        'privacy counsel', 'privacy attorney', 'privacy specialist', 'privacy analyst',
        'ip counsel', 'patent attorney', 'patent agent', 'patent engineer',
        'trademark attorney', 'trademark agent', 'copyright attorney', 'copyright specialist',
        'litigation attorney', 'trial attorney', 'trial lawyer', 'prosecutor',
        'defense attorney', 'criminal defense attorney', 'public defender',
        'district attorney', 'da', 'assistant district attorney', 'ada',
        'state attorney', 'federal prosecutor', 'us attorney', 'assistant us attorney',
        'a usa', 'attorney general', 'ag', 'solicitor general', 'sg',
        'judge', 'magistrate', 'justice', 'chief justice', 'presiding judge',
        'administrative law judge', 'alj', 'hearing officer', 'referee',
        'mediator', 'arbitrator', 'neutral', 'special master', 'discovery master',
        'law professor', 'legal academic', 'legal scholar', 'dean', 'associate dean',
        'assistant dean', 'clinical professor', 'adjunct professor', 'visiting professor',
        'lecturer', 'instructor', 'teaching assistant', 'ta', 'research assistant',
        'ra', 'fellow', 'legal fellow', 'law fellow', 'judicial clerk',
        'judicial law clerk', 'judicial extern', 'judicial intern'
    ],

    'Education & Teaching': [
        'education', 'teaching', 'instruction', 'pedagogy', 'andragogy',
        'curriculum', 'curriculum development', 'curriculum design',
        'instructional design', 'learning design', 'educational technology',
        'edtech', 'e-learning', 'online learning', 'distance learning',
        'remote learning', 'hybrid learning', 'blended learning', 'flipped classroom',
        'synchronous learning', 'asynchronous learning', 'self-paced learning',
        'personalized learning', 'adaptive learning', 'competency-based education',
        'cbe', 'mastery learning', 'project-based learning', 'pbl',
        'problem-based learning', 'inquiry-based learning', 'experiential learning',
        'hands-on learning', 'active learning', 'cooperative learning',
        'collaborative learning', 'peer learning', 'social learning',
        'gamification', 'game-based learning', 'serious games', 'educational games',

        // Teaching levels
        'early childhood education', 'ece', 'preschool', 'pre-k', 'kindergarten',
        'elementary education', 'primary education', 'elementary school',
        'middle school', 'junior high', 'intermediate school', 'secondary education',
        'high school', 'senior high', 'college preparatory', 'college prep',
        'higher education', 'tertiary education', 'post-secondary', 'undergraduate',
        'graduate', 'postgraduate', 'doctoral', 'phd', 'professional degree',
        'continuing education', 'adult education', 'lifelong learning',
        'community education', 'extension education', 'outreach education',
        'vocational education', 'career and technical education', 'cte',
        'trade school', 'technical school', 'vocational school', 'apprenticeship',
        'internship', 'externship', 'practicum', 'clinical education',
        'field education', 'service learning', 'study abroad', 'exchange program',

        // Subjects
        'mathematics', 'math', 'algebra', 'geometry', 'trigonometry',
        'calculus', 'statistics', 'probability', 'number theory', 'discrete math',
        'linear algebra', 'differential equations', 'abstract algebra',
        'real analysis', 'complex analysis', 'numerical analysis',
        'science', 'biology', 'chemistry', 'physics', 'earth science',
        'environmental science', 'life science', 'physical science',
        'anatomy', 'physiology', 'genetics', 'cell biology', 'molecular biology',
        'biochemistry', 'organic chemistry', 'inorganic chemistry',
        'physical chemistry', 'analytical chemistry', 'quantum mechanics',
        'thermodynamics', 'electromagnetism', 'optics', 'astronomy',
        'astrophysics', 'geology', 'meteorology', 'oceanography',
        'computer science', 'cs', 'programming', 'coding', 'software development',
        'web development', 'app development', 'data science', 'machine learning',
        'artificial intelligence', 'ai', 'cybersecurity', 'information technology',
        'it', 'networking', 'databases', 'operating systems',
        'english', 'language arts', 'reading', 'writing', 'composition',
        'literature', 'american literature', 'british literature', 'world literature',
        'creative writing', 'poetry', 'drama', 'shakespeare', 'grammar',
        'vocabulary', 'spelling', 'phonics', 'esl', 'english as a second language',
        'efl', 'english as a foreign language', 'ell', 'english language learner',
        'tesol', 'teaching english to speakers of other languages',
        'tefl', 'teaching english as a foreign language', 'celta',
        'delta', 'toefl', 'ielts', 'toeic',
        'history', 'world history', 'american history', 'european history',
        'ancient history', 'medieval history', 'modern history', 'art history',
        'social studies', 'geography', 'civics', 'government', 'economics',
        'macroeconomics', 'microeconomics', 'personal finance', 'sociology',
        'psychology', 'anthropology', 'philosophy', 'ethics', 'logic',
        'religion', 'world religions', 'comparative religion', 'bible studies',
        'theology', 'divinity', 'foreign languages', 'spanish', 'french',
        'german', 'italian', 'portuguese', 'russian', 'chinese', 'mandarin',
        'japanese', 'korean', 'arabic', 'hebrew', 'hindi', 'latin',
        'ancient greek', 'classical languages', 'sign language', 'asl',
        'american sign language', 'bsl', 'british sign language',
        'art', 'visual arts', 'drawing', 'painting', 'sculpture', 'ceramics',
        'pottery', 'photography', 'digital art', 'graphic design',
        'art history', 'art appreciation', 'art criticism', 'studio art',
        'music', 'music theory', 'music history', 'music appreciation',
        'vocal music', 'choir', 'chorus', 'instrumental music', 'band',
        'orchestra', 'jazz band', 'marching band', 'guitar', 'piano',
        'drums', 'percussion', 'strings', 'woodwinds', 'brass',
        'physical education', 'pe', 'gym', 'health education', 'wellness',
        'fitness', 'exercise', 'sports', 'athletics', 'coaching',
        'team sports', 'individual sports', 'lifetime sports',
        'health', 'nutrition', 'personal health', 'community health',
        'special education', 'sped', 'exceptional children', 'ec',
        'students with disabilities', 'swd', 'learning disabilities',
        'ld', 'intellectual disabilities', 'developmental disabilities',
        'autism', 'asd', 'emotional disturbance', 'behavior disorders',
        'speech and language impairment', 'hearing impairment',
        'visual impairment', 'physical disabilities', 'multiple disabilities',
        'traumatic brain injury', 'tbi', 'other health impairment', 'ohi',
        'specific learning disability', 'sld', 'gifted education',
        'gifted and talented', 'gt', 'talented and gifted', 'tag',
        'advanced learners', 'high-ability learners', 'twice-exceptional', '2e',

        // Educational roles
        'teacher', 'educator', 'instructor', 'professor', 'faculty',
        'lecturer', 'adjunct', 'adjunct professor', 'assistant professor',
        'associate professor', 'full professor', 'distinguished professor',
        'emeritus', 'professor emeritus', 'teaching assistant', 'ta',
        'graduate teaching assistant', 'gta', 'teacher assistant',
        'paraprofessional', 'paraprofessional educator', 'paraeducator',
        'instructional aide', 'teacher aide', 'classroom aide',
        'substitute teacher', 'substitute', 'guest teacher', 'relief teacher',
        'supply teacher', 'student teacher', 'intern teacher', 'resident teacher',
        'lead teacher', 'master teacher', 'mentor teacher', 'cooperating teacher',
        'supervising teacher', 'head teacher', 'department head', 'grade level lead',
        'instructional coach', 'instructional specialist', 'curriculum specialist',
        'curriculum coordinator', 'curriculum director', 'instructional designer',
        'learning designer', 'educational technologist', 'edtech specialist',
        'technology coach', 'digital learning coach', 'media specialist',
        'school librarian', 'library media specialist', 'school counselor',
        'guidance counselor', 'college counselor', 'career counselor',
        'school psychologist', 'school social worker', 'school nurse',
        'speech therapist', 'speech-language pathologist', 'slp',
        'occupational therapist', 'ot', 'physical therapist', 'pt',
        'behavior specialist', 'board certified behavior analyst', 'bcba',
        'reading specialist', 'literacy specialist', 'math specialist',
        'esl teacher', 'esl specialist', 'bilingual teacher', 'dual language teacher',
        'special education teacher', 'sped teacher', 'resource teacher',
        'inclusion teacher', 'co-teacher', 'intervention specialist',
        'principal', 'head of school', 'school leader', 'assistant principal',
        'vice principal', 'dean', 'dean of students', 'dean of instruction',
        'academic dean', 'instructional leader', 'curriculum leader',
        'department chair', 'program director', 'academic director',
        'director of curriculum and instruction', 'director of teaching and learning',
        'director of academic affairs', 'director of education',
        'superintendent', 'assistant superintendent', 'associate superintendent',
        'deputy superintendent', 'chief academic officer', 'cao',
        'chief education officer', 'ceo', 'chancellor', 'provost',
        'vice provost', 'associate provost', 'assistant provost',
        'registrar', 'assistant registrar', 'enrollment manager',
        'admissions director', 'admissions counselor', 'admissions officer',
        'financial aid director', 'financial aid counselor', 'financial aid officer',
        'academic advisor', 'academic counselor', 'student success coordinator',
        'retention specialist', 'persistence specialist',

        // Educational institutions & settings
        'public school', 'private school', 'independent school', 'parochial school',
        'religious school', 'charter school', 'magnet school', 'alternative school',
        'virtual school', 'online school', 'cyber school', 'homeschool',
        'distance learning', 'correspondence school', 'international school',
        'boarding school', 'day school', 'single-sex school', 'co-educational school',
        'community college', 'junior college', 'technical college',
        'vocational school', 'trade school', 'career college', 'for-profit college',
        'liberal arts college', 'university', 'research university',
        'teaching university', 'land-grant university', 'state university',
        'private university', 'ivy league', 'public ivy', 'historically black college',
        'hbcu', 'hispanic-serving institution', 'hsi', 'tribal college',
        'minority-serving institution', 'msi', 'women\'s college',
        'graduate school', 'professional school', 'law school', 'medical school',
        'business school', 'engineering school', 'divinity school', 'seminary',
        'art school', 'conservatory', 'music school', 'film school',
        'online program', 'online degree', 'distance education program',
        'continuing education program', 'extension program', 'adult education program',
        'workforce development program', 'professional development program',
        'executive education program', 'corporate training program',
        'summer school', 'summer program', 'summer camp', 'after-school program',
        'before-school program', 'extended day program', 'enrichment program',
        'intervention program', 'remediation program', 'tutoring program',
        'mentoring program', 'coaching program', 'peer tutoring',
        'early intervention', 'early childhood program', 'head start',
        'pre-k program', 'preschool program', 'child care center', 'daycare',

        // Educational technology & tools
        'lms', 'learning management system', 'canvas', 'blackboard',
        'moodle', 'schoology', 'google classroom', 'brightspace',
        'd2l', 'desire2learn', 'sakai', 'edmodo', 'itslearning',
        'powerschool', 'infinite campus', 'skyward', 'renweb',
        'gradpoint', 'apex learning', 'edgenuity', 'k12', 'connections academy',
        'zoom', 'google meet', 'microsoft teams', 'webex', 'adobe connect',
        'flipgrid', 'padlet', 'nearpod', 'peardeck', 'kahoot', 'quizizz',
        'gimkit', 'blooket', 'quizlet', 'brainscape', 'anki', 'memrise',
        'duolingo', 'rosetta stone', 'babbel', 'mango languages',
        'khan academy', 'coursera', 'edx', 'udemy', 'udacity', 'pluralsight',
        'linkedin learning', 'lynda.com', 'skillshare', 'masterclass',
        'codecademy', 'treehouse', 'teamtreehouse', 'freecodecamp',
        'scratch', 'tynker', 'code.org', 'hour of code',
        'seesaw', 'classdojo', 'remind', 'parent square',
        'prodigy', 'dreambox', 'dreambox learning', 'ixl', 'aleks',
        'mathia', 'cpm', 'college preparatory mathematics',
        'turnitin', 'grammarly', 'plagiarism checker', 'copyscape',
        'google docs', 'google slides', 'google forms', 'google sheets',
        'microsoft office', 'microsoft word', 'microsoft powerpoint',
        'microsoft excel', 'onenote', 'notability', 'goodnotes',
        'ebooks', 'digital textbooks', 'open educational resources', 'oer',
        'creative commons', 'public domain', 'fair use', 'copyright in education',

        // Educational assessments & standards
        'assessment', 'evaluation', 'testing', 'examination', 'quiz',
        'formative assessment', 'summative assessment', 'diagnostic assessment',
        'benchmark assessment', 'interim assessment', 'performance-based assessment',
        'authentic assessment', 'portfolio assessment', 'project-based assessment',
        'standardized testing', 'high-stakes testing', 'criterion-referenced test',
        'norm-referenced test', 'aptitude test', 'achievement test',
        'placement test', 'readiness test', 'proficiency test',
        'common core', 'common core state standards', 'ccss',
        'next generation science standards', 'ngss', 'c3 framework',
        'college career and civic life', 'istandards', 'iste standards',
        'national standards', 'state standards', 'district standards',
        'learning objectives', 'learning outcomes', 'learning targets',
        'success criteria', 'learning goals', 'educational goals',
        'bloom\'s taxonomy', 'blooms', 'higher-order thinking', 'critical thinking',
        'depth of knowledge', 'dok', 'webb\'s dok', 'rigor', 'relevance',
        'learning progression', 'scope and sequence', 'pacing guide',
        'curriculum map', 'unit plan', 'lesson plan', 'daily lesson plan',
        'weekly lesson plan', 'differentiated instruction', 'differentiation',
        'universal design for learning', 'udl', 'scaffolding', 'modeling',
        'guided practice', 'independent practice', 'direct instruction',
        'explicit instruction', 'systematic instruction', 'explicit teaching',
        'gradual release of responsibility', 'i do we do you do',
        'cooperative learning', 'collaborative learning', 'group work',
        'pair work', 'think-pair-share', 'jigsaw', 'stations', 'centers',
        'workshop model', 'readers workshop', 'writers workshop',
        'math workshop', 'inquiry-based learning', 'discovery learning',
        'problem-based learning', 'project-based learning', 'expeditionary learning',
        'place-based education', 'outdoor education', 'environmental education',
        'experiential education', 'service learning', 'community-based learning',
        'work-based learning', 'career-based learning',

        // Educational psychology & theory
        'child development', 'adolescent development', 'cognitive development',
        'social-emotional development', 'moral development', 'identity development',
        'learning theories', 'behaviorism', 'cognitivism', 'constructivism',
        'social constructivism', 'sociocultural theory', 'humanism',
        'connectivism', 'multiple intelligences', 'gardner', 'learning styles',
        'visual learners', 'auditory learners', 'kinesthetic learners',
        'read/write learners', 'vark', 'growth mindset', 'fixed mindset',
        'dweck', 'grit', 'perseverance', 'resilience', 'self-efficacy',
        'bandura', 'motivation', 'intrinsic motivation', 'extrinsic motivation',
        'self-determination theory', 'deci and ryan', 'engagement',
        'student engagement', 'behavioral engagement', 'emotional engagement',
        'cognitive engagement', 'agency', 'student agency', 'voice and choice',
        'autonomy', 'competence', 'relatedness', 'belonging',
        'school climate', 'school culture', 'positive school culture',
        'restorative practices', 'restorative justice', 'positive behavior interventions and supports',
        'pbis', 'mtss', 'multi-tiered system of supports', 'response to intervention',
        'rti', 'social-emotional learning', 'sel', 'casel',
        'trauma-informed practices', 'trauma-informed care',
        'culturally responsive teaching', 'culturally relevant pedagogy',
        'culturally sustaining pedagogy', 'equity in education',
        'educational equity', 'achievement gap', 'opportunity gap',
        'closing the gap', 'education reform', 'school improvement',
        'school turnaround', 'continuous improvement', 'data-driven instruction',
        'data-based decision making', 'evidence-based practices',
        'research-based practices', 'best practices in education'
    ]
};

const ROLE_PATTERNS = {
    // Technology Roles
    'frontend': {
        titleKeywords: [
            'frontend', 'front-end', 'front end', 'ui developer', 'ui engineer', 'react', 'angular', 'vue',
            'web developer', 'web engineer', 'javascript developer', 'typescript developer', 'css developer',
            'html developer', 'frontend architect', 'ui architect', 'web ui developer', 'frontend lead',
            'senior frontend', 'frontend specialist', 'web designer', 'ui designer', 'interaction designer',
            'web interface developer', 'frontend consultant', 'ui consultant', 'javascript architect',
            'react developer', 'angular developer', 'vue developer', 'svelte developer', 'next.js developer',
            'gatsby developer', 'web performance', 'frontend performance', 'ui performance', 'web accessibility'
        ],
        categories: ['Programming Languages', 'Frontend', 'Testing & QA', 'Tools & Practices', 'Soft Skills', 'UI/UX Design']
    },

    'backend': {
        titleKeywords: [
            'backend', 'back-end', 'back end', 'server-side', 'api developer', 'api engineer', 'node.js developer',
            'java developer', 'python developer', '.net developer', 'golang developer', 'backend architect',
            'api architect', 'microservices developer', 'backend lead', 'senior backend', 'backend specialist',
            'server developer', 'server engineer', 'api designer', 'rest api', 'graphql api', 'backend consultant',
            'nodejs developer', 'express developer', 'django developer', 'flask developer', 'spring boot developer',
            'rails developer', 'laravel developer', 'symfony developer', 'c# developer', 'ruby developer',
            'php developer', 'scala developer', 'rust developer', 'serverless developer', 'backend systems'
        ],
        categories: ['Programming Languages', 'Backend', 'Database', 'Cloud & DevOps', 'Testing & QA', 'Tools & Practices', 'Soft Skills', 'Microservices', 'API Design']
    },

    'fullstack': {
        titleKeywords: [
            'fullstack', 'full-stack', 'full stack', 'mern', 'mean', 'software engineer', 'software developer',
            'sde', 'swe', 'fullstack developer', 'fullstack engineer', 'fullstack architect', 'fullstack lead',
            'fullstack specialist', 'web developer fullstack', 'javascript fullstack', 'typescript fullstack',
            'python fullstack', 'java fullstack', '.net fullstack', 'node.js fullstack', 'react fullstack',
            'angular fullstack', 'vue fullstack', 'mern stack', 'mean stack', 'jamstack developer',
            'web application developer', 'fullstack consultant', 'fullstack product developer'
        ],
        categories: ['Programming Languages', 'Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'Testing & QA', 'Tools & Practices', 'Soft Skills', 'UI/UX Design']
    },

    'mobile': {
        titleKeywords: [
            'mobile', 'android', 'ios', 'flutter', 'react native', 'app developer', 'app engineer',
            'swift developer', 'kotlin developer', 'mobile architect', 'ios architect', 'android architect',
            'mobile lead', 'senior mobile', 'ios engineer', 'android engineer', 'flutter developer',
            'react native developer', 'xamarin developer', 'ionic developer', 'cordova developer',
            'mobile app developer', 'iphone developer', 'ipad developer', 'watchos developer',
            'tvOS developer', 'mobile ui developer', 'mobile ux designer', 'mobile product developer',
            'hybrid app developer', 'native app developer', 'cross-platform developer', 'app architect',
            'mobile consultant', 'mobile specialist', 'android consultant', 'ios consultant'
        ],
        categories: ['Programming Languages', 'Mobile', 'Frontend', 'Backend', 'Database', 'Testing & QA', 'Tools & Practices', 'Soft Skills', 'UI/UX Design']
    },

    'devops': {
        titleKeywords: [
            'devops', 'sre', 'site reliability', 'platform engineer', 'infrastructure', 'cloud engineer',
            'cloud architect', 'systems engineer', 'release engineer', 'devops architect', 'devops lead',
            'senior devops', 'platform architect', 'infrastructure architect', 'cloud consultant',
            'aws engineer', 'azure engineer', 'gcp engineer', 'kubernetes engineer', 'docker engineer',
            'ci/cd engineer', 'jenkins engineer', 'automation engineer', 'build engineer', 'release manager',
            'production engineer', 'operations engineer', 'systems administrator', 'devops consultant',
            'site reliability engineer', 'reliability engineer', 'observability engineer', 'monitoring engineer',
            'security engineer', 'devsecops', 'infrastructure as code', 'terraform engineer', 'ansible engineer'
        ],
        categories: ['Programming Languages', 'Cloud & DevOps', 'Backend', 'Database', 'Testing & QA', 'Tools & Practices', 'Soft Skills', 'Security', 'Infrastructure']
    },

    'data': {
        titleKeywords: [
            'data scientist', 'data analyst', 'data engineer', 'machine learning', 'ml engineer', 'ai engineer',
            'deep learning', 'nlp', 'computer vision', 'analytics', 'bi developer', 'bi analyst',
            'data architect', 'data lead', 'data specialist', 'data consultant', 'data science lead',
            'machine learning engineer', 'ml ops', 'mlops engineer', 'ai architect', 'ai consultant',
            'data warehousing', 'etl developer', 'data pipeline engineer', 'big data engineer',
            'spark developer', 'hadoop developer', 'data visualization', 'tableau developer', 'power bi developer',
            'data analystics consultant', 'business intelligence', 'data product manager', 'data strategist',
            'data governance', 'data quality', 'data management', 'database administrator', 'dba'
        ],
        categories: ['Programming Languages', 'Data & AI/ML', 'Database', 'Cloud & DevOps', 'Tools & Practices', 'Soft Skills', 'Data Visualization', 'Analytics']
    },

    // Content & Creative Roles
    'content_creator': {
        titleKeywords: [
            'content creator', 'content writer', 'content strategist', 'content manager', 'content specialist',
            'content developer', 'content producer', 'content marketer', 'content coordinator',
            'content director', 'content lead', 'copywriter', 'copy writer', 'technical writer',
            'creative writer', 'blogger', 'blog writer', 'article writer', 'journalist',
            'reporter', 'news writer', 'editor', 'managing editor', 'editorial assistant',
            'proofreader', 'copy editor', 'fact checker', 'ghostwriter', 'speech writer',
            'grant writer', 'proposal writer', 'medical writer', 'scientific writer',
            'academic writer', 'researcher', 'storyteller', 'narrative designer',
            'ux writer', 'product copywriter', 'brand copywriter', 'marketing copywriter',
            'ad copywriter', 'scriptwriter', 'screenwriter', 'playwright', 'poet',
            'author', 'book writer', 'ebook writer', 'newsletter writer', 'email copywriter'
        ],
        categories: ['Content Creation & Writing', 'Digital Marketing', 'Social Media Management', 'SEO', 'Tools & Practices', 'Soft Skills']
    },

    'social_media': {
        titleKeywords: [
            'social media manager', 'social media specialist', 'social media coordinator',
            'social media director', 'social media lead', 'social media strategist',
            'social media consultant', 'social media analyst', 'social media marketer',
            'community manager', 'community specialist', 'online community manager',
            'social media editor', 'social media producer', 'content creator social media',
            'instagram manager', 'tiktok manager', 'twitter manager', 'linkedin manager',
            'facebook manager', 'youtube manager', 'snapchat manager', 'pinterest manager',
            'social media assistant', 'social media associate', 'digital community manager',
            'brand community manager', 'social media engagement', 'social listening analyst',
            'influencer marketing manager', 'influencer coordinator', 'creator relations',
            'brand ambassador manager', 'social media advertising', 'paid social specialist'
        ],
        categories: ['Social Media Management', 'Content Creation & Writing', 'Digital Marketing', 'Influencer Marketing', 'Analytics', 'Tools & Practices', 'Soft Skills']
    },

    'video_production': {
        titleKeywords: [
            'video producer', 'video editor', 'video production', 'videographer', 'cinematographer',
            'film editor', 'video creator', 'video content creator', 'video specialist',
            'video manager', 'video director', 'video production manager', 'post-production',
            'video post producer', 'motion graphics designer', 'motion designer',
            'animator', '2d animator', '3d animator', 'vfx artist', 'visual effects',
            'colorist', 'color grading', 'sound editor', 'audio editor', 'sound designer',
            'video engineer', 'broadcast engineer', 'live stream producer', 'streaming producer',
            'youtube producer', 'tiktok producer', 'reels creator', 'short form video',
            'long form video', 'documentary filmmaker', 'commercial director',
            'music video director', 'corporate video producer', 'explainer video creator',
            'video journalist', 'multimedia producer', 'digital video producer'
        ],
        categories: ['Video Production & Editing', 'Photography', 'Motion Graphics', 'Audio Production', 'Tools & Practices', 'Soft Skills']
    },

    'photography': {
        titleKeywords: [
            'photographer', 'photography', 'portrait photographer', 'wedding photographer',
            'event photographer', 'commercial photographer', 'product photographer',
            'fashion photographer', 'food photographer', 'real estate photographer',
            'architectural photographer', 'landscape photographer', 'wildlife photographer',
            'travel photographer', 'street photographer', 'photojournalist',
            'sports photographer', 'action photographer', 'fine art photographer',
            'studio photographer', 'location photographer', 'photography director',
            'photography manager', 'photography assistant', 'photo editor',
            'photo retoucher', 'digital imaging specialist', 'photo technician',
            'photography instructor', 'photography teacher', 'drone photographer',
            'aerial photographer', 'underwater photographer', 'macro photographer'
        ],
        categories: ['Photography', 'Video Production & Editing', 'Graphic Design & Visual Arts', 'Photo Editing', 'Studio Lighting', 'Tools & Practices', 'Soft Skills']
    },

    'graphic_design': {
        titleKeywords: [
            'graphic designer', 'graphic design', 'visual designer', 'visual design',
            'brand designer', 'brand identity designer', 'logo designer', 'creative designer',
            'creative director', 'art director', 'design director', 'senior designer',
            'junior designer', 'design lead', 'design manager', 'design consultant',
            'print designer', 'digital designer', 'multimedia designer', 'communication designer',
            'corporate designer', 'marketing designer', 'advertising designer',
            'packaging designer', 'packaging design', 'label designer', 'brochure designer',
            'publication designer', 'editorial designer', 'magazine designer',
            'book designer', 'illustrator', 'digital illustrator', 'vector artist',
            'infographic designer', 'data visualization designer', 'typographer',
            'type designer', 'lettering artist', 'calligrapher', 'production artist'
        ],
        categories: ['Graphic Design & Visual Arts', 'Typography', 'Branding', 'Print Production', 'Digital Design', 'Tools & Practices', 'Soft Skills']
    },

    'ui_ux_design': {
        titleKeywords: [
            'ui designer', 'ux designer', 'user interface designer', 'user experience designer',
            'product designer', 'interaction designer', 'ixd designer', 'service designer',
            'experience designer', 'ui/ux designer', 'ux researcher', 'user researcher',
            'usability specialist', 'ux analyst', 'ux strategist', 'ux architect',
            'information architect', 'ia designer', 'ux writer', 'content designer',
            'ui developer', 'ui engineer', 'design system designer', 'design system manager',
            'product design lead', 'ux director', 'head of design', 'chief design officer',
            'ux consultant', 'design thinking facilitator', 'design sprint facilitator',
            'mobile ui designer', 'web ui designer', 'app designer', 'saas product designer'
        ],
        categories: ['UI/UX Design', 'User Research', 'Interaction Design', 'Information Architecture', 'Prototyping', 'Usability Testing', 'Tools & Practices', 'Soft Skills', 'Accessibility']
    },

    // Business & Management Roles
    'project_manager': {
        titleKeywords: [
            'project manager', 'pm', 'project lead', 'project coordinator', 'project administrator',
            'project controller', 'project scheduler', 'project planner', 'program manager',
            'portfolio manager', 'pmo', 'project management officer', 'project director',
            'senior project manager', 'technical project manager', 'it project manager',
            'software project manager', 'construction project manager', 'engineering project manager',
            'agile project manager', 'scrum master', 'scrum master certified', 'agile coach',
            'project management consultant', 'project management specialist', 'project analyst',
            'project scheduler', 'project controller', 'project expeditor', 'project assistant'
        ],
        categories: ['Project Management & Agile', 'Tools & Practices', 'Soft Skills', 'Leadership', 'Communication', 'Risk Management', 'Stakeholder Management']
    },

    'product_manager': {
        titleKeywords: [
            'product manager', 'product owner', 'product lead', 'product director',
            'head of product', 'vp product', 'chief product officer', 'cpo',
            'product management', 'product specialist', 'product analyst',
            'product consultant', 'product strategist', 'product visionary',
            'technical product manager', 'platform product manager', 'api product manager',
            'mobile product manager', 'web product manager', 'saas product manager',
            'b2b product manager', 'b2c product manager', 'enterprise product manager',
            'consumer product manager', 'growth product manager', 'core product manager',
            'new product manager', 'product marketing manager', 'pmm', 'product evangelist'
        ],
        categories: ['Product Management', 'Business Analysis', 'User Research', 'Data Analysis', 'Product Analytics', 'Tools & Practices', 'Soft Skills', 'Leadership']
    },

    'business_analyst': {
        titleKeywords: [
            'business analyst', 'ba', 'business analysis', 'business systems analyst',
            'systems analyst', 'requirements analyst', 'process analyst', 'business process analyst',
            'technical business analyst', 'it business analyst', 'data business analyst',
            'functional analyst', 'business consultant', 'process improvement analyst',
            'business architect', 'business process architect', 'requirements engineer',
            'product analyst', 'product owner', 'business intelligence analyst',
            'bi analyst', 'data analyst', 'systems architect', 'solutions analyst'
        ],
        categories: ['Business Analysis', 'Requirements Gathering', 'Process Modeling', 'Data Analysis', 'Documentation', 'Tools & Practices', 'Soft Skills', 'Communication']
    },

    'sales': {
        titleKeywords: [
            'sales', 'sales representative', 'sales rep', 'account executive', 'ae',
            'sales executive', 'sales manager', 'sales director', 'vp sales', 'head of sales',
            'sales development representative', 'sdr', 'business development representative', 'bdr',
            'account manager', 'key account manager', 'strategic account manager',
            'enterprise account executive', 'mid-market account executive',
            'inside sales', 'outside sales', 'field sales', 'territory sales manager',
            'regional sales manager', 'global sales manager', 'sales specialist',
            'sales consultant', 'sales engineer', 'solution engineer', 'sales enablement',
            'sales operations', 'sales analyst', 'revenue manager', 'growth manager'
        ],
        categories: ['Sales & Business Development', 'Negotiation', 'CRM', 'Account Management', 'Lead Generation', 'Prospecting', 'Soft Skills', 'Communication']
    },

    'customer_success': {
        titleKeywords: [
            'customer success manager', 'csm', 'customer success', 'client success manager',
            'account manager', 'client relationship manager', 'customer relationship manager',
            'customer support manager', 'customer experience manager', 'cx manager',
            'customer advocacy manager', 'customer retention specialist', 'renewal manager',
            'customer health manager', 'customer onboarding specialist', 'implementation manager',
            'customer training specialist', 'customer education specialist', 'customer engagement',
            'customer loyalty', 'customer lifecycle', 'post-sales', 'post-sales support',
            'technical account manager', 'tam', 'customer success consultant',
            'success architect', 'value consultant', 'outcomes manager'
        ],
        categories: ['Customer Success', 'Account Management', 'Relationship Building', 'Onboarding', 'Training', 'Customer Support', 'Soft Skills', 'Communication']
    },

    'human_resources': {
        titleKeywords: [
            'hr', 'human resources', 'hr manager', 'hr generalist', 'hr specialist',
            'hr business partner', 'hrbp', 'hr director', 'head of hr', 'vp hr',
            'chief hr officer', 'chro', 'people operations', 'people ops', 'people partner',
            'talent acquisition', 'recruiter', 'talent acquisition specialist',
            'recruiting manager', 'head of talent', 'talent partner', 'sourcer',
            'talent sourcer', 'headhunter', 'executive recruiter', 'hr coordinator',
            'hr assistant', 'hr administrator', 'hr operations', 'hr analyst',
            'hr information system', 'hris', 'compensation analyst', 'benefits specialist',
            'payroll specialist', 'training manager', 'learning and development', 'l&d',
            'talent development', 'organizational development', 'od', 'employee relations',
            'diversity and inclusion', 'dei specialist', 'culture manager', 'engagement manager'
        ],
        categories: ['Human Resources', 'Recruitment', 'Talent Management', 'Employee Relations', 'HR Operations', 'Payroll', 'Benefits', 'Training & Development', 'Soft Skills', 'Communication']
    },

    // Finance & Legal Roles
    'finance': {
        titleKeywords: [
            'finance', 'financial analyst', 'finance manager', 'finance director', 'cfo',
            'chief financial officer', 'vp finance', 'head of finance', 'financial controller',
            'accounting manager', 'accountant', 'senior accountant', 'staff accountant',
            'tax accountant', 'tax specialist', 'tax manager', 'auditor', 'internal auditor',
            'external auditor', 'financial reporting', 'fp&a', 'financial planning and analysis',
            'budget analyst', 'forecast analyst', 'treasury analyst', 'treasury manager',
            'risk analyst', 'risk manager', 'credit analyst', 'investment analyst',
            'portfolio manager', 'wealth manager', 'financial advisor', 'financial planner',
            'certified financial planner', 'cfp', 'cfa', 'chartered financial analyst',
            'cpa', 'certified public accountant', 'accounting clerk', 'bookkeeper'
        ],
        categories: ['Finance & Accounting', 'Financial Analysis', 'Accounting', 'Tax', 'Audit', 'Treasury', 'Financial Planning', 'Budgeting', 'Forecasting', 'Tools & Practices', 'Soft Skills']
    },

    'legal': {
        titleKeywords: [
            'legal', 'attorney', 'lawyer', 'counsel', 'legal counsel', 'general counsel',
            'chief legal officer', 'clo', 'corporate counsel', 'in-house counsel',
            'associate attorney', 'partner', 'of counsel', 'legal manager', 'legal director',
            'litigation attorney', 'corporate attorney', 'transactional attorney',
            'contract attorney', 'paralegal', 'legal assistant', 'legal secretary',
            'legal executive', 'compliance officer', 'compliance manager', 'compliance analyst',
            'regulatory affairs', 'regulatory specialist', 'privacy officer', 'data protection officer',
            'dpo', 'ip attorney', 'patent attorney', 'trademark attorney', 'copyright attorney',
            'legal consultant', 'legal advisor', 'legal analyst', 'legal researcher'
        ],
        categories: ['Legal & Compliance', 'Contract Law', 'Corporate Law', 'Litigation', 'Intellectual Property', 'Regulatory Compliance', 'Data Privacy', 'Legal Research', 'Legal Writing', 'Tools & Practices', 'Soft Skills']
    },

    // Education Roles
    'education': {
        titleKeywords: [
            'teacher', 'educator', 'instructor', 'professor', 'lecturer', 'faculty',
            'adjunct professor', 'assistant professor', 'associate professor', 'full professor',
            'teaching assistant', 'ta', 'graduate teaching assistant', 'substitute teacher',
            'student teacher', 'head teacher', 'lead teacher', 'master teacher',
            'curriculum developer', 'curriculum specialist', 'instructional designer',
            'learning designer', 'educational consultant', 'education consultant',
            'school principal', 'assistant principal', 'head of school', 'school director',
            'academic dean', 'dean of students', 'dean of faculty', 'provost',
            'chancellor', 'superintendent', 'education coordinator', 'education specialist',
            'early childhood educator', 'preschool teacher', 'kindergarten teacher',
            'elementary teacher', 'middle school teacher', 'high school teacher',
            'special education teacher', 'sped teacher', 'esl teacher', 'bilingual teacher',
            'music teacher', 'art teacher', 'physical education teacher', 'coach',
            'tutor', 'private tutor', 'academic coach', 'learning specialist'
        ],
        categories: ['Education & Teaching', 'Curriculum Development', 'Instructional Design', 'Educational Technology', 'Student Assessment', 'Classroom Management', 'Lesson Planning', 'Differentiated Instruction', 'Soft Skills', 'Communication']
    },

    // Healthcare Roles
    'healthcare': {
        titleKeywords: [
            'doctor', 'physician', 'medical doctor', 'md', 'surgeon', 'specialist',
            'cardiologist', 'neurologist', 'pediatrician', 'dermatologist', 'radiologist',
            'anesthesiologist', 'psychiatrist', 'obstetrician', 'gynecologist', 'ob/gyn',
            'orthopedic surgeon', 'ophthalmologist', 'dentist', 'orthodontist',
            'nurse', 'registered nurse', 'rn', 'nurse practitioner', 'np', 'physician assistant',
            'pa', 'nurse manager', 'nurse supervisor', 'nursing director', 'chief nursing officer',
            'pharmacist', 'pharmacy', 'clinical pharmacist', 'physical therapist', 'pt',
            'occupational therapist', 'ot', 'speech therapist', 'speech-language pathologist',
            'slp', 'respiratory therapist', 'radiologic technologist', 'sonographer',
            'medical laboratory scientist', 'mls', 'medical technologist', 'phlebotomist',
            'paramedic', 'emt', 'emergency medical technician', 'medical assistant',
            'healthcare administrator', 'hospital administrator', 'clinic manager',
            'medical practice manager', 'health services manager', 'medical director',
            'clinical director', 'healthcare consultant', 'public health specialist',
            'epidemiologist', 'biostatistician', 'health educator', 'community health worker'
        ],
        categories: ['Healthcare & Medical', 'Clinical Practice', 'Patient Care', 'Medical Knowledge', 'Diagnosis', 'Treatment', 'Healthcare Administration', 'Medical Terminology', 'EMR/EHR', 'Soft Skills', 'Communication']
    }
};
// const ROLE_PATTERNS = {
//     'frontend': {
//         titleKeywords: ['frontend', 'front-end', 'front end', 'ui developer', 'ui engineer', 'react', 'angular', 'vue', 'web developer', 'web engineer', 'javascript developer', 'typescript developer'],
//         categories: ['Programming Languages', 'Frontend', 'Testing & QA', 'Tools & Practices', 'Soft Skills']
//     },
//     'backend': {
//         titleKeywords: ['backend', 'back-end', 'back end', 'server-side', 'api developer', 'api engineer', 'node.js developer', 'java developer', 'python developer', '.net developer', 'golang developer'],
//         categories: ['Programming Languages', 'Backend', 'Database', 'Cloud & DevOps', 'Testing & QA', 'Tools & Practices', 'Soft Skills']
//     },
//     'fullstack': {
//         titleKeywords: ['fullstack', 'full-stack', 'full stack', 'mern', 'mean', 'software engineer', 'software developer', 'sde', 'swe'],
//         categories: ['Programming Languages', 'Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'Testing & QA', 'Tools & Practices', 'Soft Skills']
//     },
//     'design': {
//         titleKeywords: ['design', 'designer', 'graphic', 'ui/ux', 'ux', 'product designer', 'visual designer'],
//         categories: ['Design', 'Tools & Practices', 'Soft Skills']
//     },
//     'mobile': {
//         titleKeywords: ['mobile', 'android', 'ios', 'flutter', 'react native', 'app developer', 'app engineer', 'swift developer', 'kotlin developer'],
//         categories: ['Programming Languages', 'Mobile', 'Backend', 'Database', 'Testing & QA', 'Tools & Practices', 'Soft Skills']
//     },
//     'devops': {
//         titleKeywords: ['devops', 'sre', 'site reliability', 'platform engineer', 'infrastructure', 'cloud engineer', 'cloud architect', 'systems engineer', 'release engineer'],
//         categories: ['Programming Languages', 'Cloud & DevOps', 'Backend', 'Database', 'Testing & QA', 'Tools & Practices', 'Soft Skills']
//     },
//     'data': {
//         titleKeywords: ['data scientist', 'data analyst', 'data engineer', 'machine learning', 'ml engineer', 'ai engineer', 'deep learning', 'nlp', 'computer vision', 'analytics', 'bi developer', 'bi analyst'],
//         categories: ['Programming Languages', 'Data & AI/ML', 'Database', 'Cloud & DevOps', 'Tools & Practices', 'Soft Skills']
//     }
// };

/**
 * Main analysis function using winkNLP locally — no backend required.
 */
function analyzeMatch(jdText, resumeText, jobTitle) {
    if (!jdText || !resumeText) return { score: 0, matched: {}, missing: {}, recommendations: [] };

    console.log('\n========== JOB MATCHER: ANALYSIS START ==========');
    console.log('📄 Job Title:', jobTitle);
    console.log('📝 JD Length:', jdText.length, 'chars');
    console.log('📝 Resume Length:', resumeText.length, 'chars');

    const jdDoc = nlp.readDoc(jdText);
    const resumeDoc = nlp.readDoc(resumeText);

    // ── Step 1: Detect Role ──
    const roleInfo = detectRole(jobTitle, jdText);

    // ── Step 2: Extract Skills (Categorized) ──
    const { jdKeywords, matched, missing } = extractCategorizedSkills(jdDoc, resumeDoc, roleInfo.categories);

    // ── Step 3: Extract Experience ──
    const experienceData = extractExperience(jdText, resumeText);
    console.log('\n── STEP 3: EXPERIENCE ──');
    console.log('  JD requires:', experienceData?.jdExperience?.min, '+ years');
    console.log('  Resume has:', experienceData?.resumeExperience?.years, 'years');

    // ── Step 4: Calculate Semantic Similarity (local winkNLP) ──
    console.log('\n── STEP 4: SEMANTIC SIMILARITY (local) ──');
    const semanticScore = calculateSemanticSimilarity(jdDoc, resumeDoc);
    console.log('  ✅ Local Semantic Score:', semanticScore.toFixed(1) + '%');

    // ── Step 5: Calculate Keyword Score ──
    const totalKeywords = Object.values(jdKeywords).flat().length;
    const totalMatched = Object.values(matched).flat().length;
    const keywordScore = totalKeywords > 0 ? (totalMatched / totalKeywords) * 100 : 0;

    console.log('\n── STEP 5: KEYWORD SCORE ──');
    console.log('  JD Keywords found:', totalKeywords);
    console.log('  Matched in Resume:', totalMatched);
    console.log('  Missing:', Object.values(missing).flat().length);
    console.log('  Keyword Score:', keywordScore.toFixed(1) + '%');

    // ── Step 6: Weighted Final Score ──
    let expScore = 0;
    let shortfallPenalty = 0;

    if (experienceData && experienceData.jdExperience && experienceData.resumeExperience) {
        const reqMin = experienceData.jdExperience.min;
        const have = experienceData.resumeExperience.years || 0;

        if (have >= reqMin) {
            expScore = 100;
        } else {
            expScore = (have / reqMin) * 100;
            const gap = reqMin - have;
            if (gap > 2) shortfallPenalty = 30;
            else if (gap > 0) shortfallPenalty = 15;
        }
    }

    let finalScore = Math.round((keywordScore * 0.4) + (semanticScore * 0.3) + (expScore * 0.3));
    finalScore = Math.max(0, finalScore - shortfallPenalty);

    console.log('\n── STEP 6: FINAL SCORE BREAKDOWN ──');
    console.log('  Keyword Score:', keywordScore.toFixed(1), '× 0.4 =', (keywordScore * 0.4).toFixed(1));
    console.log('  Semantic Score:', semanticScore.toFixed(1), '× 0.3 =', (semanticScore * 0.3).toFixed(1));
    console.log('  Experience Score:', expScore.toFixed(1), '× 0.3 =', (expScore * 0.3).toFixed(1));
    console.log('  Shortfall Penalty:', '-' + shortfallPenalty);
    console.log('  🎯 FINAL SCORE:', finalScore + '%');
    console.log('========== ANALYSIS COMPLETE ==========\n');

    return {
        score: finalScore,
        matched,
        missing,
        experience: experienceData,
        recommendations: generateRecommendations(finalScore, missing, experienceData),
        totalKeywords,
        totalMatched,
        totalMissing: Object.values(missing).flat().length
    };
}

/**
 * Extract skills using wink-nlp stemming for better matching
 */
function extractCategorizedSkills(jdDoc, resumeDoc, categories) {
    const jdKeywords = {};
    const matched = {};
    const missing = {};

    // Helper to normalize text for precise phrase matching
    const getCleanText = (doc) => {
        // Keep alphanumeric, spaces, and technical chars, then pad for word boundaries
        return ' ' + doc.out().toLowerCase()
            .replace(/[^a-z0-9+# ]/g, ' ')
            .replace(/\s+/g, ' ') + ' ';
    };

    const jdTextClean = getCleanText(jdDoc);
    const resumeTextClean = getCleanText(resumeDoc);

    console.log('\n── STEP 2: SKILL EXTRACTION ──');
    console.log('  📋 JD cleaned text (first 300 chars):', jdTextClean.substring(0, 300) + '...');
    console.log('  📋 Resume cleaned text (first 300 chars):', resumeTextClean.substring(0, 300) + '...');

    // Show NLP word tokens
    const jdTokens = jdDoc.tokens().filter(t => !t.out(its.stopWordFlag)).out();
    const resumeTokens = resumeDoc.tokens().filter(t => !t.out(its.stopWordFlag)).out();
    console.log('  🔤 JD Word Tokens (non-stopwords):', jdTokens.slice(0, 50), '... (total:', jdTokens.length + ')');
    console.log('  🔤 Resume Word Tokens (non-stopwords):', resumeTokens.slice(0, 50), '... (total:', resumeTokens.length + ')');

    const categoriesToSearch = categories || Object.keys(SKILL_DICTIONARY);
    console.log('  📂 Categories to search:', categoriesToSearch);

    for (const [category, skills] of Object.entries(SKILL_DICTIONARY)) {
        if (!categoriesToSearch.includes(category)) continue;

        const categoryMatches = [];
        const categoryMisses = [];

        skills.forEach(skill => {
            const lowSkill = skill.toLowerCase();
            const skillNorm = lowSkill.replace(/[^a-z0-9+#]/g, ''); // "reactjs"
            const skillSpaced = lowSkill.replace(/[^a-z0-9+#]/g, ' '); // "react js"

            // Check for skill patterns in JD
            const inJD = jdTextClean.includes(' ' + lowSkill + ' ') ||
                jdTextClean.includes(' ' + skillNorm + ' ') ||
                jdTextClean.includes(' ' + skillSpaced + ' ');

            if (inJD) {
                if (!jdKeywords[category]) jdKeywords[category] = [];
                jdKeywords[category].push(skill);

                // Check Resume for same patterns
                const inResume = resumeTextClean.includes(' ' + lowSkill + ' ') ||
                    resumeTextClean.includes(' ' + skillNorm + ' ') ||
                    resumeTextClean.includes(' ' + skillSpaced + ' ');

                if (inResume) {
                    if (!matched[category]) matched[category] = [];
                    matched[category].push(skill);
                    categoryMatches.push(skill);
                } else {
                    if (!missing[category]) missing[category] = [];
                    missing[category].push(skill);
                    categoryMisses.push(skill);
                }
            }
        });

        if (categoryMatches.length > 0 || categoryMisses.length > 0) {
            console.log(`  [${category}]  ✅ matched: [${categoryMatches.join(', ')}]  ❌ missing: [${categoryMisses.join(', ')}]`);
        }
    }

    return { jdKeywords, matched, missing };
}

/**
 * Calculate semantic similarity using bag-of-words vector comparison
 */
function calculateSemanticSimilarity(doc1, doc2) {
    const freq1 = doc1.tokens().filter(t => !t.out(its.stopWordFlag)).out(its.stem, as.freqTable);
    const freq2 = doc2.tokens().filter(t => !t.out(its.stopWordFlag)).out(its.stem, as.freqTable);

    const map1 = new Map(freq1);
    const map2 = new Map(freq2);

    console.log('  📊 JD stems (top 20):', freq1.slice(0, 20));
    console.log('  📊 Resume stems (top 20):', freq2.slice(0, 20));
    console.log('  Total unique stems:', new Set([...map1.keys(), ...map2.keys()]).size);

    const allStems = new Set([...map1.keys(), ...map2.keys()]);

    let dotProduct = 0;
    let mag1 = 0;
    let mag2 = 0;

    allStems.forEach(stem => {
        const v1 = map1.get(stem) || 0;
        const v2 = map2.get(stem) || 0;
        dotProduct += v1 * v2;
        mag1 += v1 * v1;
        mag2 += v2 * v2;
    });

    mag1 = Math.sqrt(mag1);
    mag2 = Math.sqrt(mag2);

    if (mag1 === 0 || mag2 === 0) return 0;
    const similarity = (dotProduct / (mag1 * mag2)) * 100;
    console.log('  Cosine Similarity:', similarity.toFixed(2) + '%');
    return similarity;
}

function detectRole(jobTitle, jdText) {
    const titleLower = (jobTitle || '').toLowerCase();
    console.log('\n── STEP 1: ROLE DETECTION ──');
    console.log('  Job Title (lowercase):', titleLower);
    for (const [role, config] of Object.entries(ROLE_PATTERNS)) {
        const matchedKeyword = config.titleKeywords.find(kw => titleLower.includes(kw));
        if (matchedKeyword) {
            console.log('  ✅ Matched role:', role, '(keyword: "' + matchedKeyword + '")');
            console.log('  📂 Skill categories:', config.categories);
            return { role, categories: config.categories };
        }
    }
    console.log('  ⚠️ No specific role matched, using ALL categories');
    return { role: 'general', categories: Object.keys(SKILL_DICTIONARY) };
}

function extractExperience(jdText, resumeText) {
    return {
        jdExperience: extractExperienceFromJD(jdText),
        resumeExperience: extractExperienceFromResume(resumeText)
    };
}

function extractExperienceFromJD(jdText) {
    const patterns = [
        /(\d+)\s*\-\s*(\d+)\s*(?:years?|yrs?)/gi,
        /(\d+)\s*\+\s*(?:years?|yrs?)/gi,
        /(?:at\s+least|minimum|min|preferred|total|totaling)\s*(\d+)\s*(?:years?|yrs?)/gi,
        /(\d+)\s*(?:years?|yrs?)\s*(?:of\s+)?(?:work|relevant|professional|total)?\s*experience/gi,
        /experience[:\s]*(\d+)\s*(?:years?|yrs?)/gi
    ];
    let min = null, max = null;
    for (const pattern of patterns) {
        // Reset lastIndex for global regex
        pattern.lastIndex = 0;
        let match;
        while ((match = pattern.exec(jdText)) !== null) {
            const n1 = parseInt(match[1]);
            const n2 = match[2] ? parseInt(match[2]) : n1;
            if (min === null || n1 < min) min = n1;
            if (max === null || n2 > max) max = n2;
        }
    }
    return min !== null ? { min, max: max || min } : null;
}

function extractExperienceFromResume(resumeText) {
    // Patterns for years and months
    const patterns = [
        /(\d+\.?\d*)\s*(?:years?|yrs?)\s*(?:and\s+)?(\d+)?\s*(?:months?|mos?)/gi, // 2 years 8 months
        /(\d+\.?\d*)\s*\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp|professional|work|total)/gi,
        /(?:total|totaling)\s*(?:experience|exp)?[:\s]*(\d+\.?\d*)\s*(?:years?|yrs?)/gi,
        /(\d+\.?\d*)\s*(?:years?|yrs?)\s*(?:experience|exp)/gi,
        /(\d+)\s*(?:months?|mos?)\s*(?:of\s+)?(?:experience|exp)/gi // just months
    ];

    let maxFound = 0;

    patterns.forEach((pattern, index) => {
        pattern.lastIndex = 0;
        const matches = [...resumeText.matchAll(pattern)];
        matches.forEach(m => {
            let val = 0;
            if (index === 0 && m[2]) { // X years Y months
                val = parseFloat(m[1]) + (parseInt(m[2]) / 12);
            } else if (index === 4) { // Only months
                val = parseInt(m[1]) / 12;
            } else {
                val = parseFloat(m[1]);
            }
            if (val > maxFound && val < 50) maxFound = val;
        });
    });

    return maxFound > 0 ? { years: Number(maxFound.toFixed(2)) } : null;
}

function generateRecommendations(score, missing, experienceData) {
    const recs = [];
    if (score < 50) recs.push('🔴 Critical mismatch: Consider adding major skills found in JD.');
    else if (score < 75) recs.push('⚠️ Moderate match: Adding missing keywords will boost your score.');
    else recs.push('🎯 Strong match! Your resume aligns well with this role.');

    Object.entries(missing).slice(0, 3).forEach(([cat, skills]) => {
        if (skills.length > 0) recs.push(`Add ${cat}: ${skills.slice(0, 4).join(', ')}`);
    });

    return recs;
}

export { analyzeMatch };
