const sampleData = {
  profile: {
    firstName: "Burak",
    lastName: "Öztürk",
    birthDate: "1999-06-15",
    email: "burak@gmail.com",
    photoUrl: "https://res.cloudinary.com/ddcfnt2qq/image/upload/v1234567890/sample.jpg",
    summary: "Backend geliştirme konusunda tutkuluyum. Java ve Spring Boot ile mikroservisler geliştirdim."
  },
  educations: [
    {
      id: "1",
      school: "ODTÜ",
      degree: "Bilgisayar Müh.",
      startDate: "2017",
      endDate: "2021",
      description: "Yüksek onur öğrencisi"
    }
  ],
  experiences: [
    {
      id: "1",
      company: "ACME Corp",
      jobTitle: "Backend Developer",
      startDate: "2022",
      endDate: "2023",
      description: "Spring Boot ile mikroservis geliştirme"
    }
  ],
  skills: [
    { id: "1", name: "Java", level: "Advanced" },
    { id: "2", name: "React", level: "Intermediate" }
  ],
  socialLinks: [
    { id: "1", platform: "LinkedIn", url: "https://linkedin.com/in/burakozturk" },
    { id: "2", platform: "GitHub", url: "https://github.com/burakozturk" }
  ]
};

export default sampleData;
