import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { AlertCircle, Trash2, Edit2, PlusCircle, ClipboardList } from 'lucide-react';

const EmergencyManagementPage = () => {
  const [emergencies, setEmergencies] = useState([
    {
      id: 1,
      title: "Acil Servis Yoğunluğu",
      description: "COVID-19 vakalarında artış nedeniyle acil servis kapasitesi yetersiz",
      priority: "Yüksek",
      status: "Devam Ediyor",
      reportedBy: "Dr. Ayşe Yılmaz",
    },
  ]);

  const doctorsAndAssistants = [
    "Dr. Levent Atahanlı", "Dr. Murat Demir", "Dr. Gülümsün Kaya",
    "Dr. Tuba Aygün", "Asistan Emir Aşılı", "Asistan Kaan Uygun",
    "Asistan Hasan Turay", "Asistan Ozan Ertürk", "Asistan Ela Altındağ",
    "Asistan Zenan Parlar"
  ];

  const [newEmergency, setNewEmergency] = useState({
    title: '',
    description: '',
    priority: 'Orta',
    reportedBy: doctorsAndAssistants[0],
    status: 'Yeni',
  });

  const [editId, setEditId] = useState(null);

  const addEmergency = () => {
    if (editId) {
      setEmergencies(
        emergencies.map((emergency) =>
          emergency.id === editId ? { ...newEmergency, id: editId } : emergency
        )
      );
      setEditId(null);
    } else {
      const emergency = { ...newEmergency, id: emergencies.length + 1 };
      setEmergencies([...emergencies, emergency]);
    }

    setNewEmergency({
      title: '',
      description: '',
      priority: 'Orta',
      reportedBy: doctorsAndAssistants[0],
      status: 'Yeni',
    });
  };

  const deleteEmergency = (id) => {
    setEmergencies(emergencies.filter((emergency) => emergency.id !== id));
  };

  const editEmergency = (emergency) => {
    setNewEmergency({
      title: emergency.title,
      description: emergency.description,
      priority: emergency.priority,
      reportedBy: emergency.reportedBy,
      status: emergency.status,
    });
    setEditId(emergency.id);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      {/* Sayfa Başlığı */}
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <AlertCircle className="mr-2 text-gray-700" size={28} /> Hastane Acil Durum Yönetimi
      </h1>

      {/* Card Bileşeni */}
      <Card className="w-full max-w-2xl shadow-lg rounded-lg">
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <PlusCircle className="mr-2" /> Yeni Acil Durum Bildirimi
            </h3>
            <div className="space-y-2">
              <Input
                placeholder="Başlık"
                value={newEmergency.title}
                onChange={(e) => setNewEmergency({ ...newEmergency, title: e.target.value })}
              />
              <Input
                placeholder="Açıklama"
                value={newEmergency.description}
                onChange={(e) => setNewEmergency({ ...newEmergency, description: e.target.value })}
              />
              <select
                value={newEmergency.priority}
                onChange={(e) => setNewEmergency({ ...newEmergency, priority: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="Düşük">Düşük</option>
                <option value="Orta">Orta</option>
                <option value="Yüksek">Yüksek</option>
              </select>
              <select
                value={newEmergency.reportedBy}
                onChange={(e) => setNewEmergency({ ...newEmergency, reportedBy: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {doctorsAndAssistants.map((person, index) => (
                  <option key={index} value={person}>
                    {person}
                  </option>
                ))}
              </select>
              <Button
                onClick={addEmergency}
                className="w-full bg-black text-white rounded hover:bg-gray-800 py-3"
              >
                {editId ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ClipboardList className="mr-2" /> Acil Durum Listesi
            </h3>
            {emergencies.map((emergency) => (
              <div
                key={emergency.id}
                className={`border rounded p-4 mb-3 ${
                  emergency.priority === "Yüksek"
                    ? "bg-red-50 border-red-200"
                    : emergency.priority === "Orta"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{emergency.title}</h4>
                    <p className="text-sm text-gray-700">{emergency.description}</p>
                    <p className="text-sm mt-1">
                      <strong>Öncelik:</strong> {emergency.priority}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Raporlayan:</strong> {emergency.reportedBy}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Edit2
                      className="text-blue-500 cursor-pointer"
                      size={20}
                      onClick={() => editEmergency(emergency)}
                    />
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      size={20}
                      onClick={() => deleteEmergency(emergency.id)}
                    />
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600 mt-2">
                  <strong>Durum:</strong> {emergency.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyManagementPage;
