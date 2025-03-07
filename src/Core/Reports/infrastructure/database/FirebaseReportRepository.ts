
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { Report } from "../../domain/model/Report";
import { firebaseApp } from "../../../Config/firebaseconfig";

const database = firebaseApp;
const collectionName: string = "Reports";

export class FirebaseReportRepository implements ReportRepository {

    private collection = collection(database, collectionName)

    async getAllBetweenDates(startDate: Date, endDate: Date): Promise<Report[]> {
        const customeQuery = query(this.collection, where("meetingDate", ">=", startDate), where("meetingDate", "<=", endDate))
        const reports = await getDocs(customeQuery);

        const documentList = reports.docs.map((doc) => doc);
        const convertedList = documentList.map((doc) => {
            const report = { id: doc.id, data: doc.data() }
            return new Report(
                report.id,
                report.data.familyGroup,
                report.data.activeMembers,
                report.data.activeMembersChildren,
                report.data.noActiveMembers,
                report.data.noActiveMembersChildren,
                report.data.visitorChildren,
                report.data.visitors,
                report.data.totalAttendance,
                report.data.visitedHomes,
                report.data.newChristians,
                report.data.reconciled,
                report.data.vigilAttendance,
                report.data.offering,
                report.data.comments,
                new Date(report.data.meetingDate.seconds * 1000),
                report.data.creationDate,
                report.data.createdBy
            )
        })
        return convertedList;
    }

    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(database, `${collectionName}/${id}`)
            await deleteDoc(docRef)
            return Promise.resolve()
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }

    async update(report: Report): Promise<void> {
        try {
            const docRef = doc(database, `${collectionName}/${report.id}`)
            await updateDoc(docRef, {
                activeMembers: report.activeMembers,
                activeMembersChildren: report.activeMembersChildren,
                noActiveMembers: report.noActiveMembers,
                noActiveMembersChildren: report.noActiveMembersChildren,
                visitorChildren: report.visitorChildren,
                visitors: report.visitors,
                totalAttendance: report.totalAttendance,
                visitedHomes: report.visitedHomes,
                newChristians: report.newChristians,
                reconciled: report.reconciled,
                vigilAttendance: report.vigilAttendance,
                offering: report.offering,
                comments: report.comments,
                meetingDate: report.meetingDate
            })
            return Promise.resolve()
        } catch (error) {
            console.log(error)
            return Promise.reject()
        }
    }

    async getOneById(id: string): Promise<Report> {
        const docRef: any = doc(database, collectionName, id)
        const docSnap = await getDoc(docRef)
        const report: any = { id: docSnap.id, data: docSnap.data() }

        return Promise.resolve(new Report(
            report.id,
            report.data.familyGroup,
            report.data.activeMembers,
            report.data.activeMembersChildren,
            report.data.noActiveMembers,
            report.data.noActiveMembersChildren,
            report.data.visitorChildren,
            report.data.visitors,
            report.data.totalAttendance,
            report.data.visitedHomes,
            report.data.newChristians,
            report.data.reconciled,
            report.data.vigilAttendance,
            report.data.offering,
            report.data.comments,
            new Date(report.data.meetingDate.seconds * 1000),
            report.data.creationDate,
            report.data.createdBy))
    }

    async create(report: Report): Promise<void> {
        const reportData = {
            activeMembers: report.activeMembers,
            activeMembersChildren: report.activeMembersChildren,
            noActiveMembers: report.noActiveMembers,
            noActiveMembersChildren:report.noActiveMembersChildren,
            visitorChildren: report.visitorChildren,
            visitors: report.visitors,
            totalAttendance:report.totalAttendance,
            visitedHomes: report.visitedHomes,
            newChristians: report.newChristians,
            reconciled: report.reconciled,
            vigilAttendance: report.vigilAttendance,
            offering: report.offering,
            comments: report.comments,
            meetingDate: report.creationDate,
            creationDate: report.createdBy,
            createdBy: report.createdBy,
            familyGroup: {
                id: report.familyGroup?.id,
                name: report.familyGroup?.name,
                color: report.familyGroup?.color,
                teacher: report.familyGroup?.teacher,
                anfitrion: report.familyGroup?.anfitrion,
                leaders: report.familyGroup?.leaders,
                meetingDay: report.familyGroup?.meetingDay,
                meetingTime: report.familyGroup?.meetingTime
            }
        };

        await addDoc(this.collection, reportData);
        return Promise.resolve()
    }
}