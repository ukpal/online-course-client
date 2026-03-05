// src/data/instructor.js

export const instructorStats = {
  totalRevenue: 84750,
  monthlyRevenue: 12340,
  totalStudents: 145000,
  newStudentsThisMonth: 2340,
  totalCourses: 12,
  publishedCourses: 10,
  draftCourses: 2,
  avgRating: 4.9,
  totalReviews: 34500,
  totalHoursContent: 285,
};

export const revenueData = {
  monthly: [
    { month: "Jan", revenue: 8200, students: 1800 },
    { month: "Feb", revenue: 9100, students: 2000 },
    { month: "Mar", revenue: 7800, students: 1600 },
    { month: "Apr", revenue: 10500, students: 2300 },
    { month: "May", revenue: 11200, students: 2500 },
    { month: "Jun", revenue: 9800, students: 2100 },
    { month: "Jul", revenue: 12100, students: 2700 },
    { month: "Aug", revenue: 11500, students: 2400 },
    { month: "Sep", revenue: 13200, students: 2900 },
    { month: "Oct", revenue: 12800, students: 2800 },
    { month: "Nov", revenue: 14500, students: 3200 },
    { month: "Dec", revenue: 12340, students: 2340 },
  ],
};

export const recentEnrollments = [
  { id: 1, student: "Alex Morgan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexM", course: "Complete Web Development Bootcamp", date: "2 hours ago", enrollmentDate: "2025-03-06", country: "United States", price: 14.99 },
  { id: 2, student: "Priya Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS", course: "Advanced CSS and Sass", date: "5 hours ago", enrollmentDate: "2025-03-06", country: "India", price: 13.99 },
  { id: 3, student: "Tom Bradley", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TomB", course: "Complete Web Development Bootcamp", date: "8 hours ago", enrollmentDate: "2025-03-06", country: "Canada", price: 14.99 },
  { id: 4, student: "Sara Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SaraL", course: "AWS Certified Solutions Architect", date: "1 day ago", enrollmentDate: "2025-03-05", country: "Singapore", price: 18.99 },
  { id: 5, student: "David Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidP", course: "Complete Web Development Bootcamp", date: "1 day ago", enrollmentDate: "2025-03-05", country: "South Korea", price: 14.99 },
];

export const allEnrollments = [
  { id: 1, student: "Alex Morgan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexM", course: "Complete Web Development Bootcamp", enrollmentDate: "2025-03-06", country: "United States", price: 14.99 },
  { id: 2, student: "Priya Sharma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS", course: "Advanced CSS and Sass", enrollmentDate: "2025-03-06", country: "India", price: 13.99 },
  { id: 3, student: "Tom Bradley", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TomB", course: "Complete Web Development Bootcamp", enrollmentDate: "2025-03-06", country: "Canada", price: 14.99 },
  { id: 4, student: "Sara Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SaraL", course: "AWS Certified Solutions Architect", enrollmentDate: "2025-03-05", country: "Singapore", price: 18.99 },
  { id: 5, student: "David Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidP", course: "Complete Web Development Bootcamp", enrollmentDate: "2025-03-05", country: "South Korea", price: 14.99 },
  { id: 6, student: "Elena Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaR", course: "React Fundamentals", enrollmentDate: "2025-03-05", country: "Spain", price: 12.99 },
  { id: 7, student: "Marco Rossi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcoR", course: "Advanced CSS and Sass", enrollmentDate: "2025-03-04", country: "Italy", price: 13.99 },
  { id: 8, student: "Lisa Wang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LisaW", course: "Complete Web Development Bootcamp", enrollmentDate: "2025-03-04", country: "China", price: 14.99 },
  { id: 9, student: "James Anderson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesA", course: "AWS Certified Solutions Architect", enrollmentDate: "2025-03-04", country: "Australia", price: 18.99 },
  { id: 10, student: "Sophie Martin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SophieM", course: "Python for Data Science", enrollmentDate: "2025-03-03", country: "France", price: 15.99 },
  { id: 11, student: "Ahmed Hassan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AhmedH", course: "Complete Web Development Bootcamp", enrollmentDate: "2025-03-03", country: "Egypt", price: 14.99 },
  { id: 12, student: "Yuki Tanaka", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=YukiT", course: "React Fundamentals", enrollmentDate: "2025-03-03", country: "Japan", price: 12.99 },
  { id: 13, student: "Maria Santos", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaS", course: "Advanced CSS and Sass", enrollmentDate: "2025-03-02", country: "Brazil", price: 13.99 },
  { id: 14, student: "Klaus Mueller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KlausM", course: "AWS Certified Solutions Architect", enrollmentDate: "2025-03-02", country: "Germany", price: 18.99 },
  { id: 15, student: "Aisha Patel", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AishaP", course: "Python for Data Science", enrollmentDate: "2025-03-02", country: "India", price: 15.99 },
  { id: 16, student: "Liam O'Brien", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LiamO", course: "Complete Web Development Bootcamp", enrollmentDate: "2025-03-01", country: "Ireland", price: 14.99 },
  { id: 17, student: "Natasha Volkov", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NatashaV", course: "React Fundamentals", enrollmentDate: "2025-03-01", country: "Russia", price: 12.99 },
  { id: 18, student: "Carlos Garcia", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosG", course: "Advanced CSS and Sass", enrollmentDate: "2025-02-28", country: "Mexico", price: 13.99 },
  { id: 19, student: "Eva Novak", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EvaN", course: "AWS Certified Solutions Architect", enrollmentDate: "2025-02-28", country: "Hungary", price: 18.99 },
  { id: 20, student: "Chen Wei", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenW", course: "Python for Data Science", enrollmentDate: "2025-02-28", country: "Taiwan", price: 15.99 },
];

export const courses = [
  "Complete Web Development Bootcamp",
  "Advanced CSS and Sass",
  "AWS Certified Solutions Architect",
  "React Fundamentals",
  "Python for Data Science",
];

export const recentReviews = [
  { id: 1, student: "Alex M.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexM2", course: "Complete Web Development Bootcamp", rating: 5, comment: "Best web dev course ever! Sarah explains everything so clearly.", date: "2 hours ago", replied: false },
  { id: 2, student: "Nina P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NinaP", course: "Advanced CSS and Sass", rating: 4, comment: "Great course, learned a lot about modern CSS techniques.", date: "1 day ago", replied: true },
  { id: 3, student: "James R.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesR", course: "AWS Certified Solutions Architect", rating: 5, comment: "Passed my AWS exam thanks to this course! Highly recommended.", date: "2 days ago", replied: false },
  { id: 4, student: "Maya K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MayaK", course: "Complete Web Development Bootcamp", rating: 3, comment: "Good content but some sections feel rushed. Could use more examples.", date: "3 days ago", replied: true },
  { id: 5, student: "Chris D.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChrisD2", course: "Complete Web Development Bootcamp", rating: 5, comment: "Absolutely phenomenal! Changed my career path completely.", date: "4 days ago", replied: false },
];

export const payoutHistory = [
  { id: 1, date: "2024-12-01", amount: 12340, status: "completed", method: "PayPal" },
  { id: 2, date: "2024-11-01", amount: 14500, status: "completed", method: "PayPal" },
  { id: 3, date: "2024-10-01", amount: 12800, status: "completed", method: "Bank Transfer" },
  { id: 4, date: "2024-09-01", amount: 13200, status: "completed", method: "PayPal" },
  { id: 5, date: "2024-08-01", amount: 11500, status: "completed", method: "Bank Transfer" },
  { id: 6, date: "2024-07-01", amount: 12100, status: "completed", method: "PayPal" },
];

export const draftCourses = [
  {
    id: 101,
    title: "Next.js 15 Complete Guide",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
    progress: 65,
    lastEdited: "2024-12-10",
    sections: 8,
    lectures: 42,
    status: "draft",
  },
  {
    id: 102,
    title: "GraphQL Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    progress: 30,
    lastEdited: "2024-12-05",
    sections: 3,
    lectures: 15,
    status: "draft",
  },
];