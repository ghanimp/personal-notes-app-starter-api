import { createContext, useContext, useEffect, useState } from 'react';

const LocaleContext = createContext();

const dictionary = {
  id: {
    home: 'Catatan Aktif',
    archive: 'Arsip',
    newNote: 'Catatan Baru',
    search: 'Cari catatan...',
    emptyActive: 'Tidak ada catatan',
    emptyArchive: 'Arsip kosong',
    delete: 'Hapus',
    archiveBtn: 'Arsipkan',
    unarchiveBtn: 'Batalkan Arsip',
    back: 'Kembali',
    save: 'Simpan Catatan',
    cancel: 'Batal',
    titlePlaceholder: 'Judul catatan...',
    bodyPlaceholder: 'Tulis isi catatan...',
    loading: 'Memuat data...',
    login: 'Masuk',
    register: 'Daftar',
    logout: 'Keluar',
    name: 'Nama',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Konfirmasi Password',
    noAccount: 'Belum punya akun?',
    registerHere: 'Daftar di sini',
    haveAccount: 'Sudah punya akun?',
    loginHere: 'Masuk di sini',
  },
  en: {
    home: 'Active Notes',
    archive: 'Archive',
    newNote: 'New Note',
    search: 'Search notes...',
    emptyActive: 'No notes found',
    emptyArchive: 'Archive is empty',
    delete: 'Delete',
    archiveBtn: 'Archive',
    unarchiveBtn: 'Unarchive',
    back: 'Back',
    save: 'Save Note',
    cancel: 'Cancel',
    titlePlaceholder: 'Note title...',
    bodyPlaceholder: 'Write your note here...',
    loading: 'Loading data...',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    noAccount: "Don't have an account?",
    registerHere: 'Register here',
    haveAccount: 'Already have an account?',
    loginHere: 'Login here',
  },
};

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleLocale = () => setLocale((prev) => (prev === 'id' ? 'en' : 'id'));
  const t = (key) => dictionary[locale][key] || key;

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}