// Calendar Management
class CalendarManager {
    constructor() {
        this.currentDate = new Date();
        this.today = new Date();
        this.selectedDate = null;
        this.events = {};
        
        this.monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        this.init();
    }

    init() {
        // Get calendar elements
        this.calendarDays = document.getElementById('calendar-days');
        this.currentMonthElement = document.getElementById('current-month');
        this.prevButton = document.getElementById('prev-month');
        this.nextButton = document.getElementById('next-month');
        
        if (!this.calendarDays) return;
        
        // Add event listeners
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.previousMonth();
            });
        }
        
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.nextMonth();
            });
        }
        
        // Load initial events
        this.loadSampleEvents();
        
        // Render calendar
        this.renderCalendar();
        
        // Update month display
        this.updateMonthDisplay();
    }

    loadSampleEvents() {
        // Sample events for demonstration
        this.events = {
            '2024-07-08': [{ title: 'UERJ - 1ª Fase', type: 'exam' }],
            '2024-07-15': [{ title: 'Simulado ENEM', type: 'test' }],
            '2024-07-22': [{ title: 'Workshop Redação', type: 'workshop' }],
            '2024-07-30': [{ title: 'Revisão Matemática', type: 'study' }]
        };
    }

    renderCalendar() {
        if (!this.calendarDays) return;
        
        this.calendarDays.innerHTML = '';
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            const dayNumber = prevMonthLastDay - startingDayOfWeek + i + 1;
            emptyDay.textContent = dayNumber;
            
            this.calendarDays.appendChild(emptyDay);
        }
        
        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Check if this is today
            const isToday = this.isToday(year, month, day);
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            // Check if this day has events
            if (this.events[dateString]) {
                dayElement.classList.add('event');
                dayElement.title = this.events[dateString].map(e => e.title).join(', ');
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                this.selectDate(year, month, day);
            });
            
            // Add hover animation
            dayElement.addEventListener('mouseenter', () => {
                this.animateDayHover(dayElement, true);
            });
            
            dayElement.addEventListener('mouseleave', () => {
                this.animateDayHover(dayElement, false);
            });
            
            this.calendarDays.appendChild(dayElement);
        }
        
        // Add animation to calendar render
        this.animateCalendarRender();
    }

    isToday(year, month, day) {
        return year === this.today.getFullYear() &&
               month === this.today.getMonth() &&
               day === this.today.getDate();
    }

    selectDate(year, month, day) {
        // Remove previous selection
        const prevSelected = this.calendarDays.querySelector('.selected');
        if (prevSelected) {
            prevSelected.classList.remove('selected');
        }
        
        // Add selection to clicked day
        const clickedDay = Array.from(this.calendarDays.children).find(el => 
            el.textContent == day && !el.classList.contains('other-month')
        );
        
        if (clickedDay) {
            clickedDay.classList.add('selected');
            this.selectedDate = new Date(year, month, day);
            
            // Trigger selection animation
            this.animateSelection(clickedDay);
        }
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.updateMonthDisplay();
        this.renderCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.updateMonthDisplay();
        this.renderCalendar();
    }

    updateMonthDisplay() {
        if (!this.currentMonthElement) return;
        
        const monthName = this.monthNames[this.currentDate.getMonth()];
        const year = this.currentDate.getFullYear();
        this.currentMonthElement.textContent = `${monthName} ${year}`;
    }

    animateCalendarRender() {
        const days = this.calendarDays.querySelectorAll('.calendar-day');
        days.forEach((day, index) => {
            day.style.opacity = '0';
            day.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                day.style.transition = 'all 0.3s ease';
                day.style.opacity = '1';
                day.style.transform = 'scale(1)';
            }, index * 20);
        });
    }

    animateDayHover(element, isHover) {
        if (isHover) {
            element.style.transform = 'scale(1.1)';
            element.style.zIndex = '10';
        } else {
            element.style.transform = 'scale(1)';
            element.style.zIndex = '1';
        }
    }

    animateSelection(element) {
        element.style.transform = 'scale(1.2)';
        element.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
        element.style.color = 'white';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    // Method to add events
    addEvent(date, event) {
        const dateString = this.formatDateString(date);
        if (!this.events[dateString]) {
            this.events[dateString] = [];
        }
        this.events[dateString].push(event);
        this.renderCalendar();
    }

    // Method to remove events
    removeEvent(date, eventIndex) {
        const dateString = this.formatDateString(date);
        if (this.events[dateString] && this.events[dateString][eventIndex]) {
            this.events[dateString].splice(eventIndex, 1);
            if (this.events[dateString].length === 0) {
                delete this.events[dateString];
            }
            this.renderCalendar();
        }
    }

    formatDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Method to get events for a specific date
    getEventsForDate(date) {
        const dateString = this.formatDateString(date);
        return this.events[dateString] || [];
    }

    // Method to highlight specific dates
    highlightDates(dates, className = 'highlighted') {
        dates.forEach(date => {
            const dateString = this.formatDateString(date);
            const dayElement = this.findDayElement(date);
            if (dayElement) {
                dayElement.classList.add(className);
            }
        });
    }

    findDayElement(date) {
        const day = date.getDate();
        const days = Array.from(this.calendarDays.querySelectorAll('.calendar-day'));
        return days.find(el => 
            el.textContent == day && 
            !el.classList.contains('other-month')
        );
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calendarManager = new CalendarManager();
});

// Export for use in other modules
window.CalendarManager = CalendarManager;