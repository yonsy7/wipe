import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { getUserProfile, updateProfile } from '../services/users';
import { auth } from '../services/firebaseConfig';
import ImageUpload from '../components/ImageUpload';

const EditProfile = () => {
  const userId = auth.currentUser?.uid;
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const fetchedProfile = await getUserProfile(userId);
        setProfile(fetchedProfile);
        setBio(fetchedProfile.bio);
        setName(fetchedProfile.name);
        setProfilePictureUrl(fetchedProfile.profilePictureUrl);
        setBannerUrl(fetchedProfile.bannerUrl);
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      await updateProfile({ bio, name, profilePictureUrl, bannerUrl });
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: profilePictureUrl }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <ImageUpload onImageUploaded={setProfilePictureUrl} />
      <Image source={{ uri: bannerUrl }} style={{ width: '100%', height: 150 }} />
      <ImageUpload onImageUploaded={setBannerUrl} />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{profile?.username}</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Update your name"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
      />
      <TextInput
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        placeholder="Update your bio"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginTop: 10 }}
      />
      <TouchableOpacity 
        onPress={handleSaveChanges} 
        style={{ backgroundColor: '#0000ff', padding: 10, borderRadius: 5, marginTop: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;