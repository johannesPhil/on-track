import { useState, useEffect } from "react";
import Section from "./Section";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import TaskList from "./TaskList";
import { useBackgroundImage } from "../services/queries/unsplash";
import { preloadImage } from "../utils/unsplash";

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sections, setSections] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [subchecklists, setSubchecklists] = useState([]);
  const [sectionsVisible, setSectionsVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    data: null,
    parentId: null,
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    id: null,
    type: null,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedSections = localStorage.getItem("career-sections");
      const savedChecklists = localStorage.getItem("career-checklists");
      const savedSubchecklists = localStorage.getItem("career-subchecklists");

      if (savedSections) {
        setSections(JSON.parse(savedSections));
      }
      if (savedChecklists) {
        setChecklists(JSON.parse(savedChecklists));
      }
      if (savedSubchecklists) {
        setSubchecklists(JSON.parse(savedSubchecklists));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Use React Query hook to fetch daily background image
  const { data: backgroundImage, isLoading: imageIsLoading } =
    useBackgroundImage();

  // Preload image when data is available
  useEffect(() => {
    const preloadBackgroundImage = async () => {
      if (backgroundImage?.url && !backgroundImage.fallback) {
        try {
          await preloadImage(backgroundImage.url);
          setImageLoaded(true);
        } catch (error) {
          console.error("Error preloading image:", error);
          setImageLoaded(true);
        }
      } else {
        setImageLoaded(true);
      }
    };

    if (backgroundImage) {
      preloadBackgroundImage();
    }
  }, [backgroundImage]);

  // Save to localStorage whenever data changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("career-sections", JSON.stringify(sections));
    }
  }, [sections, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("career-checklists", JSON.stringify(checklists));
    }
  }, [checklists, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "career-subchecklists",
        JSON.stringify(subchecklists)
      );
    }
  }, [subchecklists, isLoaded]);

  const openModal = (type, data = null, parentId = null) => {
    setModalState({ isOpen: true, type, data, parentId });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null, parentId: null });
  };

  const handleSave = (formData) => {
    console.log("Saving:", formData); // Debug log

    if (modalState.data) {
      // Edit existing item
      if (modalState.type === "section") {
        setSections(sections.map((s) => (s.id === formData.id ? formData : s)));
      } else if (modalState.type === "checklist") {
        setChecklists(
          checklists.map((c) => (c.id === formData.id ? formData : c))
        );
      } else if (modalState.type === "subchecklist") {
        setSubchecklists(
          subchecklists.map((s) => (s.id === formData.id ? formData : s))
        );
      }
    } else {
      // Add new item
      if (modalState.type === "section") {
        const newSections = [...sections, formData];
        console.log("New sections:", newSections); // Debug log
        setSections(newSections);
      } else if (modalState.type === "checklist") {
        setChecklists([
          ...checklists,
          { ...formData, parentId: modalState.parentId },
        ]);
      } else if (modalState.type === "subchecklist") {
        setSubchecklists([
          ...subchecklists,
          { ...formData, parentId: modalState.parentId },
        ]);
      }
    }
  };

  const handleToggle = (id) => {
    // Check if it's a checklist
    const checklist = checklists.find((c) => c.id === id);
    if (checklist) {
      setChecklists(
        checklists.map((c) =>
          c.id === id ? { ...c, completed: !c.completed } : c
        )
      );
      return;
    }

    // Check if it's a subchecklist
    const subchecklist = subchecklists.find((s) => s.id === id);
    if (subchecklist) {
      setSubchecklists(
        subchecklists.map((s) =>
          s.id === id ? { ...s, completed: !s.completed } : s
        )
      );
    }
  };

  const handleDelete = (id) => {
    // Determine type and delete
    if (sections.find((s) => s.id === id)) {
      setSections(sections.filter((s) => s.id !== id));
      // Also delete related checklists and subchecklists
      const relatedChecklists = checklists.filter((c) => c.parentId === id);
      setChecklists(checklists.filter((c) => c.parentId !== id));
      relatedChecklists.forEach((c) => {
        setSubchecklists(subchecklists.filter((s) => s.parentId !== c.id));
      });
    } else if (checklists.find((c) => c.id === id)) {
      setChecklists(checklists.filter((c) => c.id !== id));
      // Also delete related subchecklists
      setSubchecklists(subchecklists.filter((s) => s.parentId !== id));
    } else if (subchecklists.find((s) => s.id === id)) {
      setSubchecklists(subchecklists.filter((s) => s.id !== id));
    }
  };

  const confirmDelete = (id) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const executeDelete = () => {
    handleDelete(confirmDialog.id);
    setConfirmDialog({ isOpen: false, id: null });
  };

  const backgroundStyle =
    backgroundImage?.url && imageLoaded && !imageIsLoading
      ? {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }
      : {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        };

  return (
    <div
      className="min-h-screen p-6 transition-all duration-1000 ease-in-out"
      style={backgroundStyle}
    >
      {/* Background attribution */}
      {backgroundImage?.author && (
        <div className="fixed bottom-4 left-4 text-xs text-white/70 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
          Photo by{" "}
          <a
            href={backgroundImage.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/90"
          >
            {backgroundImage.author}
          </a>{" "}
          on Unsplash
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-sm font-bold text-white drop-shadow-lg">
            Milestones
          </h1>

          <button
            onClick={() => setSectionsVisible(!sectionsVisible)}
            className="flex items-center justify-center mx-auto p-2 text-white/80 hover:text-white transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ease-in-out hover:cursor-pointer ${
                sectionsVisible ? "rotate-180" : "rotate-0"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            sectionsVisible
              ? "max-h-[5000px] opacity-100 transform translate-y-0"
              : "max-h-0 opacity-0 transform -translate-y-4"
          }`}
        >
          <div className="space-y-6">
            {sections.length > 0 ? (
              sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`transition-all duration-300 ease-out ${
                    sectionsVisible
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-2"
                  }`}
                  style={{
                    transitionDelay: sectionsVisible
                      ? `${index * 100}ms`
                      : "0ms",
                  }}
                >
                  <Section
                    section={section}
                    checklists={checklists}
                    subchecklists={subchecklists}
                    onToggle={handleToggle}
                    onEdit={(item) => openModal(item.type || "section", item)}
                    onDelete={confirmDelete}
                    onAddChecklist={(parentId) =>
                      openModal("checklist", null, parentId)
                    }
                    onAddSubchecklist={(parentId) =>
                      openModal("subchecklist", null, parentId)
                    }
                  />
                </div>
              ))
            ) : (
              <p className="text-white/60 text-sm italic drop-shadow-sm text-center">
                No milestones yet. Add one below .
              </p>
            )}

            <div
              className={`text-center transition-all duration-300 ease-out ${
                sectionsVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-2"
              }`}
              style={{
                transitionDelay: sectionsVisible
                  ? `${sections.length * 100}ms`
                  : "0ms",
              }}
            >
              <button
                onClick={() => openModal("section")}
                className="text-white/80 hover:text-white px-4 py-2 transition-colors cursor-pointer"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSave={handleSave}
        type={modalState.type}
        data={modalState.data}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, id: null })}
        onConfirm={executeDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      <TaskList />
    </div>
  );
}

export default Dashboard;
