import {
  getCanvas,
  getGallery,
  getTestimonials,
  getTitle
} from '../support/app.po';

// TODO: Add more E2E tests at the end of this project.
describe('Page: About us', () => {
  beforeEach(() => cy.visit('/about-us'));

  it('should display about us title', () => {
    getTitle().contains('About us');
  });
});

// TODO: This test fails on CI, maybe try with "cy.wait(2000)", which was removed here after Cypress' upgrade (maybe after upgrade it won't fail - check it out).
describe('Page: Contact', () => {
  beforeEach(() => cy.visit('/contact'));

  it('should display contact title', () => {
    getTitle().contains('Contact');
  });
});

describe('Page: Copyrights', () => {
  beforeEach(() => cy.visit('/copyrights'));

  it('should display copyrights title', () => {
    getTitle().contains('Copyrights');
  });
});

describe('Page: Cyber Security', () => {
  beforeEach(() => cy.visit('/cyber-security'));

  it('should display cyber security services titles', () => {
    getTitle().contains('Compliance Audits');
    getTitle().contains('Cyber Research');
    getTitle().contains('Ethical Hacking');
    getTitle().contains('Fuzzing');
    getTitle().contains('Post-Incident Analysis');
    getTitle().contains('Proactive Cyber Defence');
    getTitle().contains('Reverse Engineering');
    getTitle().contains('Secure Programming');
    getTitle().contains('Security Analysis');
    getTitle().contains('Systems Security');
    getTitle().contains('Social Engineering');
  });
});

describe('Page: Digital Strategy', () => {
  beforeEach(() => cy.visit('/digital-strategy'));

  it('should display digital strategy services titles', () => {
    getTitle().contains('Business Development');
    getTitle().contains('Competitors Analysis');
    getTitle().contains('Crowdfunding & Crowdsourcing');
    getTitle().contains('Culture Design');
    getTitle().contains('Data Analysis');
    getTitle().contains('Digital Marketing');
    getTitle().contains('Foresight & Trends');
    getTitle().contains('Innovation Factory');
    getTitle().contains('Interactive Systems');
    getTitle().contains('Lean Innovation');
    getTitle().contains("Minimum Viable Products (MVP's) & Proof of Concepts (PoF's)");
    getTitle().contains('Product Design');
  });
});

describe('Page: FAQ', () => {
  beforeEach(() => cy.visit('/faq'));

  it('should display faq title', () => {
    getTitle().contains('FAQ');
  });
});

describe('Page: Glossary', () => {
  beforeEach(() => cy.visit('/glossary'));

  it('should display glossary paragraph', () => {
    getTitle().contains('Glossary');
  });
});

describe('Page: Home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display particles animation', () => {
    getCanvas();
  });

  it('should display gallery', () => {
    getGallery();
  });

  it('should display testimonials', () => {
    getTestimonials();
  });
});

describe('Page: Methodology', () => {
  beforeEach(() => cy.visit('/methodology'));

  it('should display methodology title', () => {
    getTitle().contains('Methodology');
  });
});

describe('Page: Partnerships', () => {
  beforeEach(() => cy.visit('/partnerships'));

  it('should display partnerships title', () => {
    getTitle().contains('Partnerships');
  });
});

describe('Page: Privacy & Security', () => {
  beforeEach(() => cy.visit('/privacy-and-security'));

  it('should display privacy & security title', () => {
    getTitle().contains('Privacy & Security');
  });
});

describe('Page: Services', () => {
  beforeEach(() => cy.visit('/services'));

  it('should display services titles', () => {
    getTitle().contains('Cyber Security');
    getTitle().contains('Digital Strategy');
    getTitle().contains('Software Development');
  });
});

describe('Page: Sitemap', () => {
  beforeEach(() => cy.visit('/sitemap'));

  it('should display sitemap paragraph', () => {
    getTitle().contains('Sitemap');
  });
});

describe('Page: Software Development', () => {
  beforeEach(() => cy.visit('/software-development'));

  it('should display software development services titles', () => {
    getTitle().contains('Business Integrations');
    getTitle().contains('Cloud Solutions');
    getTitle().contains('Code Reviews');
    getTitle().contains('Content Management Systems');
    getTitle().contains('Complex Services');
    getTitle().contains('Custom Implementations');
    getTitle().contains('Electronic Commerce (eCommerce)');
    getTitle().contains('Mobile Development');
    getTitle().contains('Progressive Web Applications');
    getTitle().contains('Research & Discovery');
    getTitle().contains('Software Quality Engineering');
    getTitle().contains('Web Development');
  });
});

describe('Page: Terms of Use', () => {
  beforeEach(() => cy.visit('/terms-of-use'));

  it('should display terms of use title', () => {
    getTitle().contains('Terms of Use');
  });
});

describe('Page: Not found', () => {
  beforeEach(() => cy.visit('/not-found'));

  it('should display not found animation', () => {
    getCanvas();
  });
});
