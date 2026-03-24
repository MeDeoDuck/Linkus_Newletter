Set objFSO = CreateObject("Scripting.FileSystemObject")
strFolder = "c:\Users\seank\OneDrive\Desktop\linkus_newletter\"

' Root files to delete
arrRootFiles = Array("api.newsletters.route.ts", "api.newsletters.[id].route.ts", "lib.db.ts", "temp_lib_db.ts", "app.write.page.tsx", "app.newsletter.[id].page.tsx", "components.PasswordModal.tsx", "components.NewsletterCard.tsx", "NewsletterDetailPage.tsx", "WritePage.tsx")

' Delete root files
For Each file In arrRootFiles
    strPath = strFolder & file
    If objFSO.FileExists(strPath) Then
        On Error Resume Next
        objFSO.DeleteFile strPath
        On Error GoTo 0
    End If
Next

' App files to delete
arrAppFiles = Array("api.newsletters.route.ts", "api.newsletters.[id].route.ts", "db.ts", "lib.db.ts", "DeleteRoute.ts", "write.page.tsx", "PasswordModal.tsx", "components.PasswordModal.tsx", "components.NewsletterCard.tsx", "NewsletterCard.tsx", "newsletter.[id].page.tsx", "page_home.tsx", "db_code.txt")

' Delete app files
For Each file In arrAppFiles
    strPath = strFolder & "app\" & file
    If objFSO.FileExists(strPath) Then
        On Error Resume Next
        objFSO.DeleteFile strPath
        On Error GoTo 0
    End If
Next

' Run npm build
Set objShell = CreateObject("WScript.Shell")
objShell.CurrentDirectory = strFolder
objShell.Run "cmd /c npm run build", 1, True
