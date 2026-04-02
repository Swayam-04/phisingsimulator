// Phishing Email Simulator
class PhishingSimulator {
    constructor() {
        this.currentEmailIndex = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.emails = [];
        this.isAnswered = false;
        
        this.initializeEmails();
        this.bindEvents();
        this.loadNextEmail();
    }

    initializeEmails() {
        this.emails = [
            {
                from: "billing@microsft-support.com",
                subject: "URGENT: Outstanding Invoice Payment Required",
                content: "Your Microsoft Office subscription payment failed. Click here to update payment details to avoid service interruption.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Misspelled domain: 'microsft' instead of 'microsoft'",
                        "Urgent language to create panic",
                        "Suspicious link to update payment details",
                        "Generic greeting without personalization"
                    ]
                }
            },
            {
                from: "admin@yourcompany-it.com",
                subject: "IT Security Update Required",
                content: "Please verify your account by logging in through this link to complete mandatory security updates. Failure to comply will result in account suspension.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Generic greeting without personalization",
                        "Suspicious domain mimicking company IT",
                        "Requesting login through suspicious link",
                        "Threatens account suspension",
                        "Creates false urgency"
                    ]
                }
            },
            {
                from: "delivery@fedex-tracking.net",
                subject: "Package Delivery Failed - Action Required",
                content: "Your package could not be delivered. Click here to reschedule delivery.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Wrong domain (.net instead of .com)",
                        "Unexpected package delivery notification",
                        "Asking to click suspicious link",
                        "Generic delivery message",
                        "No specific package details provided"
                    ]
                }
            },
            {
                from: "noreply@paypal.com",
                subject: "Your account has been temporarily limited",
                content: "We've noticed unusual activity on your PayPal account. Please verify your identity by clicking the link below to restore full access to your account.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Creates false urgency with 'temporarily limited'",
                        "Requests immediate action to 'verify identity'",
                        "Suspicious link to restore account access",
                        "Uses fear tactics to pressure quick response"
                    ]
                }
            },
            {
                from: "support@amazon.com",
                subject: "Order Confirmation - #123-4567890",
                content: "Thank you for your recent purchase! Your order has been confirmed and will be shipped within 2-3 business days. You can track your order using the tracking number provided.",
                isPhishing: false,
                explanation: {
                    title: "This is a legitimate email!",
                    details: [
                        "Official Amazon domain (amazon.com)",
                        "Specific order number provided",
                        "Professional, informative tone",
                        "No urgent action required",
                        "Standard order confirmation format"
                    ]
                }
            },
            {
                from: "security@yourbank.com",
                subject: "Important: Verify your account information",
                content: "We need to verify your account information for security purposes. Please click here to confirm your details and prevent account suspension.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Generic bank reference without specific bank name",
                        "Threatens account suspension",
                        "Requests immediate verification",
                        "Suspicious link to 'confirm details'",
                        "Creates false urgency"
                    ]
                }
            },
            {
                from: "notifications@linkedin.com",
                subject: "You have 3 new connection requests",
                content: "You have received 3 new connection requests on LinkedIn. Log in to your account to view and respond to these requests.",
                isPhishing: false,
                explanation: {
                    title: "This is a legitimate email!",
                    details: [
                        "Official LinkedIn domain",
                        "Informative notification about platform activity",
                        "No urgent action required",
                        "Standard social media notification format",
                        "No suspicious links or requests for personal information"
                    ]
                }
            },
            {
                from: "admin@company-security.com",
                subject: "Your password will expire in 24 hours",
                content: "Your company password is about to expire. Click here immediately to update your password and avoid account lockout.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Suspicious domain 'company-security.com'",
                        "Creates false urgency with 24-hour deadline",
                        "Threatens account lockout",
                        "Requests immediate action",
                        "Generic company reference"
                    ]
                }
            },
            {
                from: "hr@company-benefits.org",
                subject: "Your Benefits Package is Ready",
                content: "Your new employee benefits package is ready for review. Click here to access your personalized benefits portal and select your coverage options.",
                isPhishing: true,
                explanation: {
                    title: "This is a phishing email!",
                    details: [
                        "Suspicious domain (.org instead of company domain)",
                        "Generic benefits message",
                        "Requesting login through suspicious link",
                        "No specific company identification",
                        "Creates false urgency about benefits"
                    ]
                }
            },
            {
                from: "support@microsoft.com",
                subject: "Security Alert: Unusual Login Activity",
                content: "We detected a login attempt from an unrecognized device. If this was you, no action is needed. If not, please secure your account immediately.",
                isPhishing: false,
                explanation: {
                    title: "This is a legitimate email!",
                    details: [
                        "Official Microsoft domain (microsoft.com)",
                        "Security alert about actual account activity",
                        "No urgent action required if legitimate",
                        "Professional security notification",
                        "Standard account security format"
                    ]
                }
            }
        ];
    }

    bindEvents() {
        document.getElementById('legitimate-btn').addEventListener('click', () => {
            this.handleAnswer(false);
        });

        document.getElementById('phishing-btn').addEventListener('click', () => {
            this.handleAnswer(true);
        });

        document.getElementById('next-email-btn').addEventListener('click', () => {
            this.hideFeedback();
            this.loadNextEmail();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartSimulation();
        });

        document.getElementById('back-to-training-btn').addEventListener('click', () => {
            window.location.href = '../public/index.html#training';
        });
    }

    loadNextEmail() {
        if (this.currentEmailIndex >= this.emails.length) {
            this.showResults();
            return;
        }

        const email = this.emails[this.currentEmailIndex];
        this.isAnswered = false;

        // Update email content
        document.getElementById('email-from').textContent = email.from;
        document.getElementById('email-subject').textContent = email.subject;
        document.getElementById('email-content').textContent = email.content;

        // Reset button states
        document.getElementById('legitimate-btn').disabled = false;
        document.getElementById('phishing-btn').disabled = false;
        document.getElementById('legitimate-btn').style.opacity = '1';
        document.getElementById('phishing-btn').style.opacity = '1';
    }

    handleAnswer(userAnswer) {
        if (this.isAnswered) return;

        this.isAnswered = true;
        this.totalAnswers++;
        
        const email = this.emails[this.currentEmailIndex];
        const isCorrect = userAnswer === email.isPhishing;

        if (isCorrect) {
            this.correctAnswers++;
        }

        // Disable buttons
        document.getElementById('legitimate-btn').disabled = true;
        document.getElementById('phishing-btn').disabled = true;

        // Update scoreboard
        this.updateScoreboard();

        // Show feedback
        this.showFeedback(email, isCorrect, userAnswer);

        // Move to next email
        this.currentEmailIndex++;
    }

    updateScoreboard() {
        document.getElementById('correct-count').textContent = this.correctAnswers;
        document.getElementById('total-count').textContent = this.totalAnswers;
        
        const accuracy = this.totalAnswers > 0 ? Math.round((this.correctAnswers / this.totalAnswers) * 100) : 0;
        document.getElementById('accuracy').textContent = accuracy + '%';
    }

    showFeedback(email, isCorrect, userAnswer) {
        const modal = document.getElementById('feedback-modal');
        const icon = document.getElementById('feedback-icon');
        const title = document.getElementById('feedback-title');
        const message = document.getElementById('feedback-message');
        const details = document.getElementById('feedback-details');

        // Update feedback content
        if (isCorrect) {
            icon.className = 'fas fa-check-circle feedback-correct';
            title.textContent = 'Correct!';
            message.textContent = 'Great job! You correctly identified this email.';
        } else {
            icon.className = 'fas fa-times-circle feedback-incorrect';
            title.textContent = 'Incorrect';
            message.textContent = `Not quite right. ${email.explanation.title}`;
        }

        // Show explanation details
        details.innerHTML = `
            <h4>Explanation:</h4>
            <ul>
                ${email.explanation.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        `;

        // Show modal
        modal.style.display = 'flex';
    }

    hideFeedback() {
        document.getElementById('feedback-modal').style.display = 'none';
    }

    showResults() {
        const modal = document.getElementById('results-modal');
        const finalCorrect = document.getElementById('final-correct');
        const finalTotal = document.getElementById('final-total');
        const finalAccuracy = document.getElementById('final-accuracy');
        const performanceMessage = document.getElementById('performance-message');

        // Update final stats
        finalCorrect.textContent = this.correctAnswers;
        finalTotal.textContent = this.totalAnswers;
        
        const accuracy = Math.round((this.correctAnswers / this.totalAnswers) * 100);
        finalAccuracy.textContent = accuracy + '%';

        // Performance message
        let message = '';
        if (accuracy >= 90) {
            message = '🎉 Excellent! You have excellent phishing detection skills!';
        } else if (accuracy >= 75) {
            message = '👏 Great job! You\'re doing well at identifying phishing emails.';
        } else if (accuracy >= 50) {
            message = '👍 Good effort! Keep practicing to improve your detection skills.';
        } else {
            message = '💪 Keep learning! Review the explanations to improve your phishing detection.';
        }
        performanceMessage.textContent = message;

        // Show results modal
        modal.style.display = 'flex';
    }

    restartSimulation() {
        // Reset all values
        this.currentEmailIndex = 0;
        this.correctAnswers = 0;
        this.totalAnswers = 0;
        this.isAnswered = false;

        // Update scoreboard
        this.updateScoreboard();

        // Hide results modal
        document.getElementById('results-modal').style.display = 'none';

        // Load first email
        this.loadNextEmail();
    }
}

// Initialize simulator when page loads
document.addEventListener('DOMContentLoaded', function() {
    new PhishingSimulator();
});
