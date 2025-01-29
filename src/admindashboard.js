// src/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from './signin';

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newBio, setNewBio] = useState('');

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // Fetch projects
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const projectList = projectsSnapshot.docs.map(doc => doc.data());
        setProjects(projectList);

        // Fetch skills
        const skillsSnapshot = await getDocs(collection(db, 'skills'));
        const skillList = skillsSnapshot.docs.map(doc => doc.data());
        setSkills(skillList);

        // Fetch bio
        const bioSnapshot = await getDocs(collection(db, 'bio'));
        setBio(bioSnapshot.docs[0]?.data().bio);
      };

      fetchData();
    }
  }, [user]);

  const handleUpdateProject = async () => {
    if (newProject) {
      const projectRef = doc(db, 'projects', 'project-id');  // Replace 'project-id' with actual project ID
      await updateDoc(projectRef, { name: newProject });
      setNewProject('');
    }
  };

  const handleUpdateSkill = async () => {
    if (newSkill) {
      const skillRef = doc(db, 'skills', 'skill-id');  // Replace with actual skill ID
      await updateDoc(skillRef, { name: newSkill });
      setNewSkill('');
    }
  };

  const handleUpdateBio = async () => {
    if (newBio) {
      const bioRef = doc(db, 'bio', 'bio-id');  // Replace with actual bio ID
      await updateDoc(bioRef, { bio: newBio });
      setNewBio('');
    }
  };

  if (!user) {
    return <SignIn onSignIn={() => {}} />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Projects</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>{project.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="New Project"
        />
        <button onClick={handleUpdateProject}>Add Project</button>
      </div>

      <div>
        <h2>Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="New Skill"
        />
        <button onClick={handleUpdateSkill}>Add Skill</button>
      </div>

      <div>
        <h2>Bio</h2>
        <textarea
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder="New Bio"
        />
        <button onClick={handleUpdateBio}>Update Bio</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
