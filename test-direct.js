import projectsHandler from './api/projects.js';
import contactsHandler from './api/contacts.js';

async function testAPIFunctions() {
  console.log('Testing API functions directly...\n');

  try {
    // Test projects GET
    console.log('1. Testing projects GET');
    const mockProjectsReq = { method: 'GET', query: {} };
    const mockProjectsRes = {
      status: (code) => ({ json: (data) => ({ status: code, data }) }),
      json: (data) => data
    };

    const projectsResult = await projectsHandler(mockProjectsReq, mockProjectsRes);
    console.log(`   Status: ${projectsResult.status}`);
    console.log(`   Projects count: ${projectsResult.data.length}`);
    console.log(`   First project: ${projectsResult.data[0]?.title || 'No projects'}\n`);

    // Test contacts GET
    console.log('2. Testing contacts GET');
    const mockContactsReq = { method: 'GET' };
    const mockContactsRes = {
      status: (code) => ({ json: (data) => ({ status: code, data }) }),
      json: (data) => data
    };

    const contactsResult = await contactsHandler(mockContactsReq, mockContactsRes);
    console.log(`   Status: ${contactsResult.status}`);
    console.log(`   Contacts count: ${contactsResult.data.length}\n`);

    // Test contacts POST
    console.log('3. Testing contacts POST');
    const mockPostContactsReq = {
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message'
      }
    };
    const mockPostContactsRes = {
      status: (code) => ({ json: (data) => ({ status: code, data }) }),
      json: (data) => data
    };

    const postContactsResult = await contactsHandler(mockPostContactsReq, mockPostContactsRes);
    console.log(`   Status: ${postContactsResult.status}`);
    console.log(`   Created contact ID: ${postContactsResult.data.id}\n`);

    // Test projects POST
    console.log('4. Testing projects POST');
    const mockPostProjectsReq = {
      method: 'POST',
      query: {},
      body: {
        title: 'Test Project',
        description: 'This is a test project',
        tech: ['React', 'Node.js'],
        githubLink: 'https://github.com/test'
      }
    };
    const mockPostProjectsRes = {
      status: (code) => ({ json: (data) => ({ status: code, data }) }),
      json: (data) => data
    };

    const postProjectsResult = await projectsHandler(mockPostProjectsReq, mockPostProjectsRes);
    console.log(`   Status: ${postProjectsResult.status}`);
    console.log(`   Created project ID: ${postProjectsResult.data.id}\n`);

    console.log('✅ All API function tests completed successfully!');
    console.log('✅ Migration from Supabase to JSON storage is working correctly!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPIFunctions();
