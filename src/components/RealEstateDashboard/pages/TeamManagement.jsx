import React, { useState, useEffect } from "react";
import {
  FiUserPlus,
  FiSend,
  FiEye,
  FiX,
  FiClipboard,
  FiBriefcase,
  FiCheckCircle,
  FiAlertTriangle,
  FiPlus,
} from "react-icons/fi";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig"; // Adjust path if needed
import { toast } from "react-toastify";

// --- UI COMPONENTS ---

const PerformanceBadge = ({ performance }) => {
  const styles = {
    Excellent: "bg-green-100 text-green-800",
    Good: "bg-blue-100 text-blue-800",
    New: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        styles[performance] || styles.New
      }`}
    >
      {performance}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-gray-100 text-gray-800",
  };
  return (
    <span
      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

// --- MODAL COMPONENTS ---

const AddMemberModal = ({ isOpen, onClose, memberType }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: memberType === "Team" ? "Sales Agent" : "Broker Partner",
    email: "",
    reraId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        role: memberType === "Team" ? "Sales Agent" : "Broker Partner",
        email: "",
        reraId: "",
      });
    }
  }, [isOpen, memberType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const collectionName = memberType === "Team" ? "teamMembers" : "brokers";
    let dataToSave = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      createdAt: serverTimestamp(),
    };

    if (memberType === "Team") {
      dataToSave = { ...dataToSave, tasks: [], performance: "New" };
    } else {
      dataToSave = {
        ...dataToSave,
        reraId: formData.reraId,
        assignedProjects: [],
      };
    }

    try {
      await addDoc(collection(db, collectionName), dataToSave);
      toast.success(`${memberType} "${formData.name}" added successfully!`);
      onClose();
    } catch (error) {
      toast.error(`Failed to add ${memberType}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New {memberType}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full input p-2"
            placeholder={memberType === "Team" ? "Full Name" : "Brokerage Name"}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full input p-2"
            placeholder="Contact Email"
          />
          {memberType === "Team" ? (
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full input p-2 "
            >
              <option>Sales Agent</option>
              <option>Senior Sales Agent</option>
              <option>Admin Staff</option>
            </select>
          ) : (
            <input
              type="text"
              value={formData.reraId}
              onChange={(e) =>
                setFormData({ ...formData, reraId: e.target.value })
              }
              required
              className="w-full input"
              placeholder="RERA ID"
            />
          )}
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AssignTaskModal = ({ isOpen, onClose, member }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Please enter a task title.");
      return;
    }
    setIsSubmitting(true);
    const memberDocRef = doc(db, "teamMembers", member.id);
    try {
      await updateDoc(memberDocRef, {
        tasks: arrayUnion({
          id: `task_${Date.now()}`,
          ...formData,
          status: "Pending",
          assignedAt: new Date(),
        }),
      });
      toast.success(`Task assigned to ${member.name}!`);
      onClose();
    } catch (error) {
      toast.error("Failed to assign task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Assign Task</h2>
        <p className="text-gray-600 mb-6">
          Assign a new task to{" "}
          <span className="font-semibold">{member.name}</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full input"
            placeholder="Task Title"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="w-full input"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full input"
            />
          </div>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="3"
            className="w-full input resize-none"
            placeholder="Task Description"
          ></textarea>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2"
            >
              <FiSend size={16} />{" "}
              {isSubmitting ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewTasksModal = ({ isOpen, onClose, member, setTeam }) => {
  if (!isOpen || !member) return null;
  const handleTaskStatusChange = async (taskIndex, newStatus) => {
    const updatedTasks = [...member.tasks];
    updatedTasks[taskIndex].status = newStatus;
    const memberDocRef = doc(db, "teamMembers", member.id);
    try {
      await updateDoc(memberDocRef, { tasks: updatedTasks });
      setTeam((prevTeam) =>
        prevTeam.map((m) =>
          m.id === member.id ? { ...m, tasks: updatedTasks } : m
        )
      );
      toast.success("Task status updated!");
    } catch (error) {
      toast.error("Failed to update task status.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800">
            Tasks for {member.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto mt-6 pr-2 space-y-4">
          {member.tasks?.length > 0 ? (
            member.tasks.map((task, index) => (
              <div
                key={task.id || index}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {task.description}
                    </p>
                  </div>
                  <PriorityBadge priority={task.priority} />
                </div>
                <div className="flex justify-between items-end mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    Due: {task.dueDate || "Not set"}
                  </p>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleTaskStatusChange(index, e.target.value)
                    }
                    className="text-sm input"
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No tasks assigned yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const AssignProjectModal = ({ isOpen, onClose, broker }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const q = query(collection(db, "properties"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) {
      toast.error("Please select a project.");
      return;
    }
    setIsSubmitting(true);
    const brokerDocRef = doc(db, "brokers", broker.id);
    try {
      await updateDoc(brokerDocRef, {
        assignedProjects: arrayUnion(selectedProject),
      });
      toast.success(`Project assigned to ${broker.name}!`);
      onClose();
    } catch (error) {
      toast.error("Failed to assign project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !broker) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Assign Project
        </h2>
        <p className="text-gray-600 mb-6">
          Assign a project to{" "}
          <span className="font-semibold">{broker.name}</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full input"
          >
            <option value="">Select a Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.projectName}>
                {p.projectName}
              </option>
            ))}
          </select>
          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2"
            >
              <FiPlus /> {isSubmitting ? "Assigning..." : "Assign Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Team");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [addModalType, setAddModalType] = useState("Team");
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isViewTasksModalOpen, setViewTasksModalOpen] = useState(false);
  const [isAssignProjectModalOpen, setAssignProjectModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    setLoading(true);
    const teamQuery = query(collection(db, "teamMembers"));
    const brokerQuery = query(collection(db, "brokers"));
    const unsubTeam = onSnapshot(
      teamQuery,
      (snapshot) =>
        setTeam(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
      () => setError("Failed to fetch team members.")
    );
    const unsubBrokers = onSnapshot(
      brokerQuery,
      (snapshot) =>
        setBrokers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
      () => setError("Failed to fetch brokers.")
    );

    // A simple way to wait for both listeners to get initial data
    Promise.all([
      new Promise((res) => onSnapshot(teamQuery, () => res())),
      new Promise((res) => onSnapshot(brokerQuery, () => res())),
    ]).then(() => {
      setLoading(false);
    });

    return () => {
      unsubTeam();
      unsubBrokers();
    };
  }, []);

  const handleOpenAddModal = (type) => {
    setAddModalType(type);
    setAddModalOpen(true);
  };

  const handleAssignTask = (member) => {
    setSelectedMember(member);
    setTaskModalOpen(true);
  };

  const handleViewTasks = (member) => {
    setSelectedMember(member);
    setViewTasksModalOpen(true);
  };

  const handleAssignProject = (broker) => {
    setSelectedMember(broker);
    setAssignProjectModalOpen(true);
  };

  const renderContent = () => {
    if (loading) return <div className="text-center p-6">Loading...</div>;
    if (error)
      return <div className="text-center p-6 text-red-500">{error}</div>;

    if (activeTab === "Team") {
      if (team.length === 0)
        return (
          <div className="text-center p-10 bg-white rounded-xl shadow-sm">
            No team members found.
          </div>
        );
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800">
                    {member.name}
                  </h3>
                  <PerformanceBadge performance={member.performance} />
                </div>
                <p className="text-sm text-gray-500">{member.role}</p>
                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <FiClipboard size={16} />
                  <span className="text-sm font-medium">
                    {member.tasks?.length || 0} Active Tasks
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t flex items-center justify-between gap-3">
                <button
                  onClick={() => handleViewTasks(member)}
                  className="btn-secondary-sm flex items-center gap-2"
                >
                  <FiEye size={14} /> View Tasks
                </button>
                <button
                  onClick={() => handleAssignTask(member)}
                  className="btn-primary-sm flex items-center gap-2"
                >
                  <FiSend size={14} /> Assign Task
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "Brokers") {
      if (brokers.length === 0)
        return (
          <div className="text-center p-10 bg-white rounded-xl shadow-sm">
            No brokers found.
          </div>
        );
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-800">
                  {broker.name}
                </h3>
                <p className="text-sm text-gray-500">RERA: {broker.reraId}</p>
                <div className="mt-4 flex items-center gap-2 text-gray-600">
                  <FiBriefcase size={16} />
                  <span className="text-sm font-medium">
                    {broker.assignedProjects?.length || 0} Assigned Projects
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t flex items-center justify-end">
                <button
                  onClick={() => handleAssignProject(broker)}
                  className="btn-primary-sm flex items-center gap-2"
                >
                  <FiPlus /> Assign Project
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        memberType={addModalType}
      />
      <AssignTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        member={selectedMember}
      />
      <ViewTasksModal
        isOpen={isViewTasksModalOpen}
        onClose={() => setViewTasksModalOpen(false)}
        member={selectedMember}
        setTeam={setTeam}
      />
      <AssignProjectModal
        isOpen={isAssignProjectModalOpen}
        onClose={() => setAssignProjectModalOpen(false)}
        broker={selectedMember}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Team & Broker Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage internal staff, agents, and broker partners.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={() => handleOpenAddModal("Team")}
            className="btn-primary flex items-center gap-2"
          >
            <FiUserPlus /> Add Team Member
          </button>
          <button
            onClick={() => handleOpenAddModal("Broker")}
            className="btn-secondary flex items-center gap-2"
          >
            <FiBriefcase /> Add Broker
          </button>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab("Team")}
            className={`py-2 px-1 font-semibold transition-colors duration-200 ${
              activeTab === "Team"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Internal Team ({team.length})
          </button>
          <button
            onClick={() => setActiveTab("Brokers")}
            className={`py-2 px-1 font-semibold transition-colors duration-200 ${
              activeTab === "Brokers"
                ? "text-amber-600 border-b-2 border-amber-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Broker Partners ({brokers.length})
          </button>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default TeamManagement;
