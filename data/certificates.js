// src/data/certificates.js

export const generateCertificateId = (courseId, userId) => {
  const hash = `LH-${courseId}-${userId}-${Date.now().toString(36).toUpperCase()}`;
  return hash;
};

export const getCertificateData = (course, user, completionDate) => {
  return {
    id: generateCertificateId(course.id, user?.id || 0),
    courseName: course.title,
    studentName: user?.fullName || "Student",
    instructorName: course.instructor,
    completionDate: completionDate || new Date().toISOString(),
    totalHours: course.totalHours,
    totalLectures: course.totalLectures,
    courseCategory: course.category,
    level: course.level,
  };
};