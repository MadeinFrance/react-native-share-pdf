package com.maximegerbe.reactnative.sharefile;

/*
 * Created by Maxime Gerbe on 06/03/2019.
 *
 * This source code is licensed under the MIT license
 */

import android.content.Intent;
import android.net.Uri;
import android.support.v4.content.FileProvider;
import android.util.Base64;
import android.app.Activity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import okhttp3.MediaType;

public class ShareFile extends ReactContextBaseJavaModule {
  private static final String REACT_CLASS = "RNShareFile";
  private static final String TYPE_PDF = MediaType.parse("application/pdf").toString();
  private static final String PDF_CACHE_DIR = "pdf_documents_for_sharing";
  ReactApplicationContext reactContext;

  public ShareFile(ReactApplicationContext reactContext) {
    super(reactContext);

    this.reactContext = reactContext;
  }

  @ReactMethod
  public void share(String base64pdf, String filename, Promise promise) {
    try {
      cleanSharedFiles();
      File pdfFile = writeFile(base64pdf, filename);
      shareFile(pdfFile);

      promise.resolve(true);
    } catch (IOException e) {
      promise.reject(e);
    }
  }

  private void cleanSharedFiles() {
    File directoryPath = getDirectoryPath();
    if (directoryPath.isDirectory()) {
      for (String file : directoryPath.list()) {
        new File(directoryPath, file).delete();
      }
    }
  }

  private File writeFile(String base64pdf, String filename) throws IOException {
    File directoryPath = getDirectoryPath();
    directoryPath.mkdir();
    File newFilePath = new File(directoryPath.getPath(), filename);

    byte[] pdfAsBytes = Base64.decode(base64pdf, Base64.DEFAULT);

    try (FileOutputStream os = new FileOutputStream(newFilePath, false)) {
      os.write(pdfAsBytes);
      os.flush();
    }

    return newFilePath;
  }

  private void shareFile(File file) {
    Uri outputFileUri = FileProvider.getUriForFile(reactContext, "com.maximegerbe.reactnative.sharefile.provider", file);

    Intent intentShareFile = new Intent(Intent.ACTION_SEND);
    intentShareFile.setType(TYPE_PDF);
    intentShareFile.putExtra(Intent.EXTRA_STREAM, outputFileUri);
    intentShareFile.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    
    Activity currentActivity = getCurrentActivity();
    currentActivity.startActivity(Intent.createChooser(intentShareFile, ""));
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  private File getDirectoryPath() {
    return new File(reactContext.getCurrentActivity().getFilesDir(), PDF_CACHE_DIR);
  }
}
