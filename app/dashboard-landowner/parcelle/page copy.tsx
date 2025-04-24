'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, MapPin, Wheat, ArrowUpRight, Droplet, Sun, Calendar } from 'lucide-react';
import Link from 'next/link';
import AddParcelDialog from '@/components/parcels/AddParcelDialog';

// Mock parcels data
const mockParcels = [
  { 
    id: 1, 
    name: 'Champ Nord', 
    area: '14.5 ha', 
    cropType: 'Blé', 
    plantingDate: '15 mars 2023', 
    status: 'En croissance',
    lastIntervention: { type: 'Irrigation', date: '10 mai 2023', icon: <Droplet className="h-4 w-4" /> }
  },
  { 
    id: 2, 
    name: 'Verger Est', 
    area: '8.2 ha', 
    cropType: 'Pommiers', 
    plantingDate: '3 avril 2022', 
    status: 'Productif',
    lastIntervention: { type: 'Traitement', date: '15 mai 2023', icon: <Sun className="h-4 w-4" /> }
  },
  { 
    id: 3, 
    name: 'Champ Sud', 
    area: '22.7 ha', 
    cropType: 'Maïs', 
    plantingDate: '22 avril 2023', 
    status: 'En croissance',
    lastIntervention: { type: 'Semis', date: '22 avril 2023', icon: <Wheat className="h-4 w-4" /> }
  },
  { 
    id: 4, 
    name: 'Prairie Centrale', 
    area: '12.0 ha', 
    cropType: 'Luzerne', 
    plantingDate: '7 mars 2023', 
    status: 'En croissance',
    lastIntervention: { type: 'Fertilisation', date: '8 mai 2023', icon: <Sun className="h-4 w-4" /> }
  },
  { 
    id: 5, 
    name: 'Oliveraie Ouest', 
    area: '5.5 ha', 
    cropType: 'Oliviers', 
    plantingDate: '15 février 2020', 
    status: 'Productif',
    lastIntervention: { type: 'Taille', date: '3 mai 2023', icon: <Calendar className="h-4 w-4" /> }
  },
  { 
    id: 6, 
    name: 'Vignoble', 
    area: '9.8 ha', 
    cropType: 'Vigne', 
    plantingDate: '10 mars 2022', 
    status: 'Productif',
    lastIntervention: { type: 'Irrigation', date: '12 mai 2023', icon: <Droplet className="h-4 w-4" /> }
  },
];

const Parcels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const filteredParcels = mockParcels.filter(parcel => {
    const matchesSearch = parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          parcel.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || parcel.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleParcelAdded = () => {
    console.log('Parcel added, would refresh data here');
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow pt-2 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold font-cabinet mb-2">Mes Parcelles</h1>
              <p className="text-muted-foreground">
                Gérez vos parcelles agricoles et consultez leurs informations.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <AddParcelDialog onParcelAdded={handleParcelAdded} />
            </div>
          </div>
          
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher une parcelle..."
                  className="input-field pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <select
                  className="input-field pl-10 w-full appearance-none"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="En croissance">En croissance</option>
                  <option value="Productif">Productif</option>
                  <option value="En repos">En repos</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredParcels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParcels.map((parcel, index) => (
                <Card 
                  key={parcel.id} 
                  className="animate-fade-in bg-nature-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl font-medium mb-1">{parcel.name}</CardTitle>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4 mr-1" /> {parcel.area}
                        </div>
                      </div>
                      <div 
                        className={`text-xs px-2 py-1 rounded-full ${
                          parcel.status === 'En croissance' ? 'bg-nature-100 text-nature-700' :
                          parcel.status === 'Productif' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {parcel.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 pt-0">
                    <div className="flex items-center mb-4 pt-4 border-t border-gray-100">
                      <div className="p-2 rounded-full bg-nature-100 mr-3">
                        <Wheat className="h-4 w-4 text-nature-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Culture</p>
                        <p className="text-sm text-muted-foreground">{parcel.cropType}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-earth-100 mr-3">
                        <Calendar className="h-4 w-4 text-earth-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Plantation</p>
                        <p className="text-sm text-muted-foreground">{parcel.plantingDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        {parcel.lastIntervention.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dernière intervention</p>
                        <p className="text-sm text-muted-foreground">{parcel.lastIntervention.type} - {parcel.lastIntervention.date}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 pb-4 border-t border-gray-100">
                    <Link href={`/parcels/${parcel.id}`} className="w-full">
                      <Button 
                        variant="outline" 
                        className="w-full"
                      >
                        Voir les détails
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm animate-fade-in">
              <div className="inline-flex items-center justify-center p-4 bg-nature-50 rounded-full mb-4">
                <Search className="h-6 w-6 text-nature-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucune parcelle trouvée</h3>
              <p className="text-muted-foreground mb-4">
                Aucune parcelle ne correspond à vos critères de recherche.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedStatus('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Parcels;
