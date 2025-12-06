import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAllergies } from '@/hooks/useUserAllergies';
import { useAllergyMode } from '@/contexts/AllergyModeContext';
import { formatAllergenName } from '@/utils/allergenUtils';
import AllergyModal from '@/components/AllergyModal';
import BottomNavbar from '@/components/BottomNavbar';
import {
  User,
  Mail,
  Shield,
  Edit2,
  LogOut,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { allergies, saveAllergies, isLoading } = useUserAllergies();
  const { isAllergyModeOn, toggleAllergyMode } = useAllergyMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    navigate('/login');
  };

  const handleSaveAllergies = async (newAllergies: string[]) => {
    await saveAllergies(newAllergies);
    toast({
      title: 'Allergies updated',
      description: 'Your allergy preferences have been saved',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="primary-gradient px-4 pt-12 pb-20">
        <h1 className="text-2xl font-bold text-primary-foreground">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-12">
        <div className="bg-card rounded-xl p-6 swiggy-shadow">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">
                {user?.email?.split('@')[0] || 'User'}
              </h2>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user?.email || 'user@example.com'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Allergy Section */}
      <section className="px-4 mt-6">
        <h3 className="text-lg font-bold text-foreground mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            My Allergies
          </div>
        </h3>

        <div className="bg-card rounded-xl swiggy-shadow overflow-hidden">
          {/* Allergy Mode Toggle */}
          <button
            onClick={toggleAllergyMode}
            className="w-full flex items-center justify-between p-4 border-b border-border"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle
                className={`w-5 h-5 ${isAllergyModeOn ? 'text-success' : 'text-muted-foreground'}`}
              />
              <div className="text-left">
                <p className="font-medium text-foreground">Allergy Detection</p>
                <p className="text-sm text-muted-foreground">
                  {isAllergyModeOn ? 'Active' : 'Disabled'}
                </p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full relative transition-colors ${
                isAllergyModeOn ? 'bg-success' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-card transition-transform ${
                  isAllergyModeOn ? 'right-1' : 'left-1'
                }`}
              />
            </div>
          </button>

          {/* Allergy List */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Your allergens:</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 text-primary text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            ) : allergies.length === 0 ? (
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">
                  No allergies set. Tap Edit to add your allergens.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium"
                  >
                    {formatAllergenName(allergy)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Logout */}
      <section className="px-4 mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-card rounded-xl p-4 swiggy-shadow flex items-center justify-between text-destructive"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Allergy Modal */}
      <AllergyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentAllergies={allergies}
        onSave={handleSaveAllergies}
      />

      <BottomNavbar />
    </div>
  );
};

export default ProfilePage;
