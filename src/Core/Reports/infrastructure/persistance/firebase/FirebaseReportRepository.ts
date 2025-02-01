
import { firebaseApp } from "../../../../Shared/utils/firebaseconfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite";
import { ReportRepository } from "../../../domain/repository/ReportRepository";
import { Report } from "../../../domain/model/Report";

const database = firebaseApp;

export class FirebaseReportRepository implements ReportRepository {

    private readonly collection = collection(database, "Reports")

    async create(report: Report): Promise<void> {
        console.log(report)
        const reportData = {
            ...report,
            familyGroup: {
                name: report.familyGroup?.name || "",
                color: report.familyGroup?.color || ""
            }
        };
        // const newReport = 
        await addDoc(this.collection, reportData);
        return Promise.resolve()
    }

    async getAll(): Promise<Report[]> {

        const reports = await getDocs(this.collection);
        const reportList = reports.docs.map((doc) => doc.data())

        const convertedList = reportList.map((report: any) => new Report(
            report.familyGroup,
            report.activeMember,
            report.activeMemberChildren,
            report.noActiveMember,
            report.noActiveMemberChildren,
            report.visitorChildren,
            report.visitors,
            report.totalAttendance,
            report.visitedHomes,
            report.newChristians,
            report.reconciled,
            report.vigilAttendance,
            report.offering,
            report.notes,
            new Date(report.meetingDate.seconds * 1000),
            report.creationDate,
            report.createdBy
        ))
        return Promise.resolve(convertedList)
    }

    async getByPeriod(initialDate: Date, finalDate: Date): Promise<Report[]> {
        // const { startOfWeek, endOfWeek } = this.getStartEndWeek()
        const customeQuery = query(this.collection, where("meetingDate", ">=", initialDate), where("meetingDate", "<=", finalDate))
        const reports = await getDocs(customeQuery);

        const reportsList = reports.docs.map((doc) => doc.data());
        const convertedList = reportsList.map((report) => new Report(
            report.familyGroup,
            report.activeMember,
            report.activeMemberChildren,
            report.noActiveMember,
            report.noActiveMemberChildren,
            report.visitorChildren,
            report.visitors,
            report.totalAttendance,
            report.visitedHomes,
            report.newChristians,
            report.reconciled,
            report.vigilAttendance,
            report.offering,
            report.notes,
            new Date(report.meetingDate.seconds * 1000),
            report.creationDate,
            report.createdBy
        ))
        return Promise.resolve(convertedList)
    }

    getStartEndWeek() {
        const now = new Date();

        // Calcular el inicio de la semana (lunes)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Ajusta el primer día de la semana (lunes)
        startOfWeek.setHours(0, 0, 0, 0);

        // Calcular el fin de la semana (domingo)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Domingo
        endOfWeek.setHours(23, 59, 59, 999);
        return { startOfWeek, endOfWeek }
    }
}