import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000'; // Vercel dev default port

async function testAPI() {
  console.log('Testing API endpoints...\n');

  try {
    // Test projects endpoint
    console.log('1. Testing GET /api/projects');
    const projectsResponse = await fetch(`${BASE_URL}/api/projects`);
    const projects = await projectsResponse.json();
    console.log(`   Status: ${projectsResponse.status}`);
    console.log(`   Projects count: ${projects.length}`);
    console.log(`   First project: ${projects[0]?.title || 'No projects'}\n`);

    // Test contacts endpoint
    console.log('2. Testing GET /api/contacts');
    const contactsResponse = await fetch(`${BASE_URL}/api/contacts`);
    const contacts = await contactsResponse.json();
    console.log(`   Status: ${contactsResponse.status}`);
    console.log(`   Contacts count: ${contacts.length}\n`);

    // Test creating a new contact
    console.log('3. Testing POST /api/contacts');
    const newContact = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message'
    };
    const postContactResponse = await fetch(`${BASE_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact)
    });
    const createdContact = await postContactResponse.json();
    console.log(`   Status: ${postContactResponse.status}`);
    console.log(`   Created contact ID: ${createdContact.id}\n`);

    // Test creating a new project
    console.log('4. Testing POST /api/projects');
    const newProject = {
      title: 'Test Project',
      description: 'This is a test project',
      tech: ['React', 'Node.js'],
      githubLink: 'https://github.com/test'
    };
    const postProjectResponse = await fetch(`${BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject)
    });
    const createdProject = await postProjectResponse.json();
    console.log(`   Status: ${postProjectResponse.status}`);
    console.log(`   Created project ID: ${createdProject.id}\n`);

    console.log('✅ All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\nNote: Make sure to run "npm run dev" first to start the development server');
  }
}

testAPI();
